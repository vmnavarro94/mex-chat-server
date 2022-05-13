const express = require('express')
const cors = require('cors')
const passport = require('passport')
const routerApi = require('./routes')
const { checkApiKey } = require('./middlewares/auth.handler')

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

app.get('/check-auth', checkApiKey, (_req, res) => {
  res.send('Access Granted')
})

app.use(passport.initialize())
routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHangler)
app.use(errorHandler)

app.listen(port)
