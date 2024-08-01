import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult
} from 'aws-lambda'
import { createUsers as createUser } from '../../services/users.services'
import responseObject from '../../utils/response'
export const createUsers: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (typeof event.body === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = JSON.parse(event.body)
    return await createUser(body)
  }
  return responseObject(404, { message: 'Body is required' })
}
