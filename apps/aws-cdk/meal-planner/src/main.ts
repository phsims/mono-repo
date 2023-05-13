import { App } from 'aws-cdk-lib';
import { DynamoDbStack } from './lib/dynamodb-stack';
import { LambdaStack } from './lib/lambda-stack';

const appName = 'meal-planner';
const app = new App();

const dynamoDbStack = new DynamoDbStack(app, `${appName}-dynamoDb-stack`);
const lambdaStack = new LambdaStack(app, `${appName}-lambda-stack`, {
  table: dynamoDbStack.table,
});

