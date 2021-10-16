const fs = require('fs')
const Router = require('koa-router')

const router = new Router({
  prefix: '/api'
})

fs.readdirSync(__dirname).forEach((item) => {
  if (item !== 'index.js') {
    router.use(
      require(`./${item}`).routes()
    )
  }
})

module.exports = router