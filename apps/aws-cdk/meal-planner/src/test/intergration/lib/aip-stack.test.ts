import { Stack, App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DynamoDbStack } from '../../../lib/dynamodb-stack';
import { CognitoStack } from '../../../lib/cognito-stack';
import { LambdaStack } from '../../../lib/lambda-stack';
import { APIStack } from '../../../lib/api-stack';

test('APIStack Stack', () => {
  const app = new App();
  const dynamoDbStack = new DynamoDbStack(app, `TestStack-dynamoDb-stack`);
  const cognitoStack = new CognitoStack(app, `TestStack-cognito-stack`);
  const lambdaStack = new LambdaStack(app, 'TestStack-lambda-stack', {
    table: dynamoDbStack.table,
    userPool: cognitoStack.userPool,
  });
  const stack = new APIStack(app, 'TestStack', {
    lambdaFunctions: lambdaStack.lambdaFunctions,
  });
  const template = Template.fromStack(stack as Stack);

  expect(template).toMatchSnapshot('TestStack');
});
