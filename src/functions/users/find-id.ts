import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult
} from 'aws-lambda'

import { findById } from '../../services/users.services'

export const getUser: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: userId }: any = event.pathParameters

  return await findById(userId)
}
