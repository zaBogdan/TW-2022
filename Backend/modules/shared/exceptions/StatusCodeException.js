class StatusCodeException extends Error {
    constructor(message, statusCode) {
      super(message)
      this.name = 'VALIDATION_ERROR'
      this.message = message
      this.statusCode = statusCode
    }
}

module.exports = StatusCodeException;