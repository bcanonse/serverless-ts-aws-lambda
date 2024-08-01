/* eslint-disable prettier/prettier */
import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult
} from 'aws-lambda'

import { updateUser as update } from '../../services/users.services'
import responseObject from '../../utils/response'

export const updateUsers: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (typeof event.body === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = JSON.parse(event.body)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id: userId }: any = event.pathParameters
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await update(userId, body)
  }
  return responseObject(404, { message: 'Body is required' })
}
