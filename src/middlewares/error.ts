export class MiddlewareErros extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class ServerError extends MiddlewareErros {
  constructor(message: string) {
    super(message, 500)
  }
}
export class NotFoundError extends MiddlewareErros {
  constructor(message: string) {
    super(message, 404)
  }
}

export class BadRequestError extends MiddlewareErros {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnAuthorizationError extends MiddlewareErros {
  constructor(message: string) {
    super(message, 401)
  }
}
