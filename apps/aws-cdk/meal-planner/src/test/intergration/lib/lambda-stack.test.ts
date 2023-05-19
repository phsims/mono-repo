import { Stack, App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DynamoDbStack } from '../../../lib/dynamodb-stack';
import { CognitoStack } from '../../../lib/cognito-stack';
import { LambdaStack } from '../../../lib/lambda-stack';

test('LambdaStack Stack', () => {
  const app = new App();
  const dynamoDbStack = new DynamoDbStack(app, `TestStack-dynamoDb-stack`);
  const cognitoStack = new CognitoStack(app, `TestStack-cognito-stack`);

  const stack = new LambdaStack(app, 'TestStack', {
    table: dynamoDbStack.table,
    userPool: cognitoStack.userPool,
  });
  const template = Template.fromStack(stack as Stack);

  expect(template).toMatchSnapshot('TestStack');
});
