const express = require('express')
const http = require('http')
const cors = require('cors')
const passport = require('passport')
const routerApi = require('./routes')
const WebSockets = require('./services/wss.service')

const {
  logErrors,
  errorHandler,
  boomErrorHangler,
  ormErrorHandler,
} = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

require('./utils/auth')

app.get('/', (req, res) => {
  res.send('Chat Server API')
})

app.use(passport.initialize())
routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHangler)
app.use(errorHandler)

const httpServer = http.createServer(app)
httpServer.listen(port)

httpServer.on('listening', () => {
  WebSockets.init(httpServer)
})
