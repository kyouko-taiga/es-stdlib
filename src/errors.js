export class IndexError extends Error {

  constructor(index) {
    super(`IndexError: ${index}`)
    this.index = index
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(`IndexError: ${index}`)).stack
    }
  }

}

export class KeyError extends Error {

  constructor(index) {
    super(`KeyError: ${key}`)
    this.key = key
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(`KeyError: ${key}`)).stack
    }
  }

}
