const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const billRouter = require('./router/bill')
const userRouter = require('./router/user')

const app = new Koa()

app
  .use(bodyParser())
  .use(userRouter.routes())
  .use(billRouter.routes())

module.exports = app