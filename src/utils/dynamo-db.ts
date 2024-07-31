import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import * as dotenv from 'dotenv'

dotenv.config()

const dynamoDbClientParms =
  process.env.IS_OFFLINE != null
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: process.env.DEFAULT_ACCESS_KEY,
        secretAccessKey: process.env.DEFAULT_SECRET
      }
    : {}

const client = new DynamoDBClient(dynamoDbClientParms)
export const dbclient = DynamoDBDocumentClient.from(client)
