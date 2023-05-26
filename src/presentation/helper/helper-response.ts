import { HttpResponse } from '../protocols'

export const ok = (response: any): HttpResponse => {
  return {
    status: 200,
    data: response
  }
}

export const redirect = (response: any): HttpResponse => {
  return {
    status: 201,
    data: response
  }
}
export const badRequest = (message: string): HttpResponse => {
  return {
    status: 400,
    data: message
  }
}

export const internalError = (message: string): HttpResponse => {
  return {
    status: 500,
    data: message
  }
}
