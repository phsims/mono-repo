import { Stack, App, RemovalPolicy } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import {
  AssumeRolePolicyDocument,
  ExecutionPolicyStatement,
  RoleDocumentStatement,
} from '../../data/lambda';
import { DynamoDbStack } from '../../../lib/dynamodb-stack';
import { CognitoStack } from '../../../lib/cognito-stack';
import { LambdaStack } from '../../../lib/lambda-stack';

describe('LambdaStack - Unit tests', () => {
  const app = new App();
  const dynamoStack = new DynamoDbStack(app, 'TestDynamoStack');
  const cognitoStack = new CognitoStack(app, 'TestCognitoStack');

  const table = new Table(dynamoStack, `TestStack-table`, {
    partitionKey: { name: 'testPK', type: AttributeType.STRING },
  });
  const userPool = new UserPool(cognitoStack, `TestStack-pool`, {
    userPoolName: 'test-pool',
  });

  const stack = new LambdaStack(app, 'TestStack', {
    table: table,
    userPool: userPool,
  });
  const template = Template.fromStack(stack as Stack);
  test('IAM::Role', () => {
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: AssumeRolePolicyDocument,
    });
  });
  test('lambdaExecution IAM::Role', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [Match.objectLike(RoleDocumentStatement)],
      },
    });
  });
  test('lambdaRoleDefaultPolicy IAM::Policy', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [Match.objectLike(ExecutionPolicyStatement)],
      },
    });
  });
});
