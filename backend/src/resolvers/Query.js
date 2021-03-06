const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const checkUser = ctx => {
  if(!ctx.request.userId) {
    throw new Error('You must tbe logged in to do that!')
  }
  return true
}

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),

  me(parent, args, ctx, info) {
    // check user Id
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id:  ctx.request.userId },
    }, info)
  },

  users(parent, args, ctx, info) {
    // check if user have login
    checkUser(ctx)
    // check if has permission
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    // retur all users
    return ctx.db.query.users({}, info)
  },
  
  async order(parent, args, ctx, info) {
    // check if user have login
    checkUser(ctx);
    // return order
    const order = await ctx.db.query.order({
      where: { id: args.id },
    }, info)
    // check if owns order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN')
    if(!ownsOrder || !hasPermission) {
      throw new Error('You can see this Buddd');
    }
    return order;
  },

  async orders(parent, args, ctx, info) {
    // check if user have login
    checkUser(ctx);
    const orders = await ctx.db.query.orders({
      where: {
        user: {
          id: ctx.request.userId,
        }
      }
    }, info)
    return orders;
  },

   /*async items(parent, args, ctx, info) {
    const items = await ctx.db.query.items();
    return items;
  }*/
};

module.exports = Query;
