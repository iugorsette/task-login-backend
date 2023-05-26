import setupRoute from './routes'
import express from 'express'
import setupMiddleware from './middlewares'

const app = express()
setupMiddleware(app)
setupRoute(app)

export default app
