import { App } from 'aws-cdk-lib';
import { DynamoDbStack } from './lib/dynamodb-stack';
import { LambdaStack } from './lib/lambda-stack';
import { CognitoStack } from './lib/cognito-stack';

const appName = 'meal-planner';
const app = new App();

const dynamoDbStack = new DynamoDbStack(app, `${appName}-dynamoDb-stack`);
const cognitoStack = new CognitoStack(app, `${appName}-cognito-stack`);

const lambdaStack = new LambdaStack(app, `${appName}-lambda-stack`, {
  table: dynamoDbStack.table,
  userPool: cognitoStack.userPool,
});
