import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// CORS configuration
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your domain
    : true,
  credentials: true,
})

// Helper method to wait for middleware to execute
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export { cors }

