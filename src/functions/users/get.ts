import {
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult
} from 'aws-lambda'
import { getAll } from '../../services/users.services'

export const getUsers: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    return await getAll()
  }
