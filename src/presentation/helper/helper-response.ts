import { HttpResponse } from '../protocols'

export const ok = (response: any): HttpResponse => {
  return {
    status: 200,
    data: response
  }
}

export const created = (response: any): HttpResponse => {
  return {
    status: 201,
    data: response
  }
}

export const accepted = (response: any): HttpResponse => {
  return {
    status: 202,
    data: response
  }
}

export const redirect = (response: any): HttpResponse => {
  return {
    status: 302,
    data: response
  }
}

export const badRequest = (message: string): HttpResponse => {
  return {
    status: 400,
    data: { message }
  }
}

export const unauthorized = (response: any): HttpResponse => {
  return {
    status: 401,
    data: response
  }
}

export const forbidden = (response: any): HttpResponse => {
  return {
    status: 403,
    data: response
  }
}
export const notFound = (response: any): HttpResponse => {
  return {
    status: 404,
    data: response
  }
}

export const notAcceptable = (response: any): HttpResponse => {
  return {
    status: 406,
    data: response
  }
}

export const conflict = (response: any): HttpResponse => {
  return {
    status: 409,
    data: response
  }
}

export const internalError = (message: string): HttpResponse => {
  return {
    status: 500,
    data: message
  }
}
