import { QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbclient } from '../utils/dynamo-db'
import responseObject from '../utils/response'
import { type ResponseCustom } from '../types'
import { v6 as uuid } from 'uuid'

export const findById = async (id: string): Promise<ResponseCustom> => {
  const command = new QueryCommand({
    TableName: 'users',
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': {
        S: id
      }
    },
    ConsistentRead: true
  })

  try {
    const response = await dbclient.send(command)
    const { Items: items } = response

    if (response.Count === 1) {
      return responseObject(200, items?.[0])
    }

    return responseObject(404, { message: 'User not found' })
  } catch (error) {
    return responseObject(500, { message: 'Error not handler' })
  }
}

export const getAll = async (): Promise<ResponseCustom> => {
  const command = new ScanCommand({
    TableName: 'users',
    ConsistentRead: true
  })

  try {
    const response = await dbclient.send(command)
    const { Items: items } = response

    return responseObject(200, items)
  } catch (error) {
    return responseObject(500, { message: 'Error not handler' })
  }
}

export const createUsers = async (data: unknown): Promise<ResponseCustom> => {
  const id: string = uuid()

  const parms = new PutCommand({
    TableName: 'users',
    Item: { ...data, pk: id }
  })

  try {
    const response = await dbclient.send(parms)

    console.log(response)

    return responseObject(201, { id })
  } catch (error) {
    return responseObject(500, { message: 'Error of create item not handler' })
  }
}
