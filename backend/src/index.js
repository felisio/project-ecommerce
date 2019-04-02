const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db')

const server = createServer();

// Express middlewares to hanlde cookies (JWT)
server.express.use(cookieParser())

// Use GWT to get user ID and decode for each request
server.express.use((req, res, next) => {
  const { token } = req.cookies
  if(token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // put the userId into the req for futures requests to access
    req.userId = userId
  }
  next();
})

// Create a middleware that populates the user on each requets
server.express.use(async (req, res, next) => {
  // if they aren't login skyp this
  if(!req.userId) return next();

  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id name email permissions }'
  );
  req.user = user
  next();
})

server.start({
  // cors: {
  //   credentials: true,
  //   origin: process.env.FRONTEND_URL
  // },
}, deet => {
  console.log(`server in running in port http://localhost:${deet.port}`)
})
