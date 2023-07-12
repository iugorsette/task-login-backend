import { Controller, HttpRequest } from '../../presentation'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const request: HttpRequest = {
      body: req.body,
      header: req.headers,
      params: req.params,
      query: req.query
    }
    const httpResponse = await controller.handler(request)
    res.status(httpResponse.status).json(httpResponse.data)
  }
}
