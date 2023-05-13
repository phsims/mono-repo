import { Stack, App } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import '@aws-cdk/assert/jest';
import { Resources } from '../../data/data';
import { DynamoDbStack } from '../../../lib/dynamodb-stack';
test('DynamoDbStack - Unit test', () => {
  const app = new App();

  const stack = new DynamoDbStack(app, 'TestStack');
  const template = Template.fromStack(stack as Stack);

  template.hasResource('AWS::DynamoDB::Table', Resources);
});
