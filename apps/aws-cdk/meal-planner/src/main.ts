import { App } from 'aws-cdk-lib';
import { CognitoStack } from './lib/cognito-stack';
import { DynamoDBStack } from './lib/dynamodb-stack';
import { LambdaStack } from './lib/lambda-stack';
import { APIStack } from './lib/api-stack';

const app = new App();

// TODO : get value from json
const appName = 'meal-planner';
const env = 'develop'

const dynamoDBStack = new DynamoDBStack(app, `${appName}-dynamodb-stack-${env}`);
const cognitoStack = new CognitoStack(app, `${appName}-cognito-stack-${env}`);
const lambdaStack = new LambdaStack(app, `${appName}-lambda-stack-${env}`, { userPool: cognitoStack.userPool, ddbTable: dynamoDBStack.ddbTable });
const apiStack = new APIStack(app, `${appName}-api-stack`, { lambdaFunctions: lambdaStack.lambdaFunctions, userPool: cognitoStack.userPool });

