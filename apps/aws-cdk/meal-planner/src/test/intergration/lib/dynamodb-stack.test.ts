import { Stack, App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DynamoDbStack } from '../../../lib/dynamodb-stack';

test('DynamoDb Stack', () => {
  const app = new App();

  const stack = new DynamoDbStack(app, 'TestStack');
  const template = Template.fromStack(stack as Stack);

  expect(template).toMatchSnapshot('TestStack');
});
