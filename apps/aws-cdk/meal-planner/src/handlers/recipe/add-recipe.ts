import { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const TABLE_NAME: string = 'name';
async function addRecipe(item: any) {
  const dynamo = new DynamoDB.DocumentClient();
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: TABLE_NAME,
    Item: item,
  };

  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return item;
    });
}
