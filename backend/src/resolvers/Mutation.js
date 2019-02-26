const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const stripe = require('../stripe')

const { transport, mikeANiceEmail } = require('../mail')
const { hasPermission } = require('../utils')

const TOKEN = 'token'

const createToken = user => jwt.sign({ userId: user.id }, process.env.APP_SECRET)

const createCokkie = (ctx, token) => {
  ctx.response.cookie(TOKEN, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  })
}

const checkUser = ctx => {
  if(!ctx.request.userId) {
    throw new Error('You must be logged in to do that!')
  }
  return true
}

const Mutations = {
  async createItem(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must tbe logged in to do that!')
    }

    const item = await ctx.db.mutation.createItem({
      data: { 
        // creating relationship between Item and User
        user: {
          connect: {
            id: ctx.request.userId,
          },
        },
        ...args 
      }
    }, info)

    return item
  },

  async updateItem(paret, args, ctx, info) {
    const updates = { ...args };
    // delete de ID because we not update the ID
    delete updates.id
    // run the update method
    return await ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id,
      },
    }, info)
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    // find the item
    const item = await ctx.db.query.item({ where }, `{ id title user { id } }`)
    // check if have permission
    const ownsItem = item.user.id === ctx.request.userId
    const hasPermission = ctx.request.user.permissions.some(
      permission => ['ADMIN', 'ITEMDELETE'].includes(permission)
    )
    if(!ownsItem && !hasPermission) {
      throw new Error('You don\'t have permission to do that')
    }
    // delete it 
    return await ctx.db.mutation.deleteItem({ where }, info)
  },

  async signup(parent, args, ctx, info) {
    // lower case email
    args.email = args.email.toLowerCase()
    // hash password
    const password = await bcrypt.hash(args.password, 10)
    // create user
    const user = await ctx.db.mutation.createUser({ 
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] },
      } 
    }, info)
    // create JWT token and set jwt in cookie 
    createCokkie(ctx, createToken(user))
    // return user
    return user
  },

  async signin(parent, { email, password }, ctx, info) {
    // Check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if(!user) {
      throw new Error(`No such User found for email ${email}`)
    }
    // Check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if(!valid) {
      throw new Error('Invalid Password!')
    }
    // create JWT token and set jwt in cookie
    createCokkie(ctx, createToken(user))
    // return user
    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie(TOKEN)
    return { message: 'Goodbye!' }
  },

  async requestReset(parent, args, ctx, info) {
    // check if this is a real user
    const { email } = args;
    const user = await ctx.db.query.user({ where: { email } })
    if(!user) {
      throw new Error(`No such User found for email ${email}`)
    }
    // Set a reset token and expiry on that user
    const randomBytesPromisefied = promisify(randomBytes)
    const resetToken = (await randomBytesPromisefied(20)).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    })
    // Email them that reset token
    const mailRes = await transport.sendMail({
      from: 'fabio.elisio@gmail.com',
      to: user.email,
      subject: 'Your Password reset token!',
      html: mikeANiceEmail(`
        Your Password rest token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}" >Click Here to reset!</a>
      `)
    })
    // return to user
    return { message: 'Thanks!' }
  },

  async resetPassword(parent, args, ctx, info) {
    // 1. Check if the pasword match
    const { password, confirmPassword, resetToken } = args
    if(password !== confirmPassword) { throw new Error('Yo password don\'t Match') }
    // 2. Check if its a legit reset token
    // 3. Check if its expired
    const [user] =  await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      }
    })
    if(!user) { throw new Error('This token is either invalid or Expired!') }
    // 4. Hash their new password
    const newPassword = await bcrypt.hash(password, 10)
    // 5. Save the new password to the user and remove old resetToken fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password: newPassword, 
        resetToken: null, 
        resetTokenExpiry: null, 
      }
    })
    // 6. Generate JWT
    // 7. Set the JWT Token
    createCokkie(ctx, createToken(updatedUser))
    // 8. return the new user
    return updatedUser
  },

  async updatePermissions(parent, args, ctx, info) {
    // 1. check if they are logged in
    checkUser(ctx)
    // 2. Query the current user
    const currentUser = await ctx.db.query.user({ where: { id: ctx.request.userId } }, info)
    // 3. Check if they have permissions to do this
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE'])
    // 4. update the permissions
    return ctx.db.mutation.updateUser({
      data: { 
        permissions: {
          set: args.permissions,
        } 
      },
      where: { id: args.userId }
    }, info)
  },

  async addToCart(parent, args, ctx, info) {
    // verify if are signed in
    const { userId } =  ctx.request
    if(!userId) {
      throw new Error('You need signed in soon!')
    }
    // query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems(
      {
        where: {
          user: { id: userId },
          item: { id: args.id }, 
        },
      }, info)
    // Check if item is already in their cart and increment by 1 if it is
    if(existingCartItem) {
      return ctx.db.mutation.updateCartItem({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 }
      }, info)
    }
    // if not create a new cartItem for this User
    return ctx.db.mutation.createCartItem({
      data: {
        user: {
          connect: { id: userId },
        },
        item: {
          connect: { id: args.id },
        },
      },
    }, info)
  },

  async removeFromCart(parent, args, ctx, info) {
    // Find Cart Item
    const cartItem = await ctx.db.query.cartItem({
      where: { id: args.id },
    }, `{ id, user { id } }`)
    if(!cartItem) throw new Error('No cart Item found!')
    // Make sure they own that cart item
    if(cartItem.user.id !== ctx.request.userId) throw new Error('Cheatin Uhhh!')
    // Delete cart item
    return await ctx.db.mutation.deleteCartItem({
      where: { id: args.id },
    }, info)
  },

  async createOrder(parent, args, ctx, info) {
    // 1. Query the current user and make sure they are signed in
    const { userId } =  ctx.request
    if(!userId) {
      throw new Error('You need signed to complete this Order!')
    }
    const user = await ctx.db.query.user({ where: { id: userId } }, `
      {
        id
        name
        email
        cart {
          id
          quantity
          item {
            id
            title
            price
            description
            image
            largeImage
          }
        }
      }
    `)
    // 2. recalculate the total for the price
    const amount = user.cart.reduce((tally, cartItem) => tally + cartItem.item.price * cartItem.quantity, 0)
    // 3. Create the stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token,
    })
    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      }
      delete orderItem.id
      return orderItem
    })
    // 5. create the Order
    const order = ctx.db.mutation.createOrder({
      data: {
        total: amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
        createAt: new Date(),
        updateAt: new Date(),
      }
    })
    // 6. Clean up - Clear the users Items and delete Cart Items
    const cartItemsIds = user.cart.map(cartItem => cartItem.id)
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemsIds,
      }
    })
    // 7. Return the Order to the clients
    return order;
  },
};

module.exports = Mutations;
