import { type ResponseCustom } from '../types'

const responseObject = (statusCode: number, body: unknown): ResponseCustom => {
  return {
    statusCode,
    body: JSON.stringify(body)
  }
}

export default responseObject
