import { HttpRequest } from './http-request'
import { HttpResponse } from './http-response'

export interface Controller {
  handler: (request: HttpRequest) => Promise<HttpResponse>
}
