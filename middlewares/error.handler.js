const { ValidationError } = require('sequelize')

const logErrors = (error, req, res, next) => {
  console.error(error)
  next(error)
}

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  })
}

const boomErrorHangler = (error, req, res, next) => {
  if (error.isBoom) {
    const { output } = error
    res.status(output.statusCode).json(output.payload)
  }
  next(error)
}

const ormErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors,
    })
  }
  next(error)
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHangler,
  ormErrorHandler,
}
