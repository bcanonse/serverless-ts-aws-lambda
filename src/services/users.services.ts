import { QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'
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
    return responseObject(500, { message: 'Error to get users not handler' })
  }
}

export const createUsers = async (data: unknown): Promise<ResponseCustom> => {
  const id: string = uuid()

  const parms = new PutCommand({
    TableName: 'users',
    Item: { ...data, pk: id }
  })

  try {
    await dbclient.send(parms)

    return responseObject(201, { id })
  } catch (error) {
    return responseObject(500, { message: 'Error of create item not handler' })
  }
}

export const updateUser = async (
  id: string,
  data: unknown
): Promise<ResponseCustom> => {
  const parms = new UpdateCommand({
    TableName: 'users',
    Key: {
      pk: id
    },
    UpdateExpression: 'set #name = :name, #phone = :phone',
    ExpressionAttributeValues: {
      ':name': data.name,
      ':phone': data.phone
    },
    ExpressionAttributeNames: { '#name': 'name', '#phone': 'phone' },
    ReturnValues: 'ALL_NEW'
  })

  try {
    const response = await dbclient.send(parms)

    return responseObject(200, response.Attributes)
  } catch (error) {
    return responseObject(500, { message: 'Error to update item not handler' })
  }
}

export const deleteUser = async (id: string): Promise<ResponseCustom> => {
  const command = new DeleteCommand({
    TableName: 'users',
    Key: {
      pk: id
    }
  })

  try {
    const response = await dbclient.send(command)
    return responseObject(200, response.Attributes)
  } catch (error) {
    return responseObject(500, { message: 'Error to delete user not handler' })
  }
}
