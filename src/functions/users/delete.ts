import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult
} from 'aws-lambda'

import { deleteUser } from '../../services/users.services'

export const deleteUsers: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: userId }: any = event.pathParameters

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await deleteUser(userId)
}
