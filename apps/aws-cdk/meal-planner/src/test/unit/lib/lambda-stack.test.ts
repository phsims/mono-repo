import { Stack, App, RemovalPolicy } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import {
  LambdaLayerProperties,
  LogsIAMPolicy,
  DynamoIAMPolicy,
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

  describe('IAM', () => {
    test('Role', () => {
      template.hasResource('AWS::IAM::Role', {});
    });

    test('Policy logs', () => {
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [Match.objectLike(LogsIAMPolicy)],
        },
      });
    });
    test('Policy functions', () => {
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [Match.objectLike(DynamoIAMPolicy)],
        },
      });
    });

    describe('Lambda::Function', () => {
      test('api authorizer ', () => {
        template.hasResourceProperties(
          'AWS::Lambda::Function',
          Match.objectLike({ FunctionName: 'TestStack-api-authorizer' })
        );
      });
      test('add user ', () => {
        template.hasResourceProperties(
          'AWS::Lambda::Function',
          Match.objectLike({ FunctionName: 'TestStack-add-user' })
        );
      });

      test('update user ', () => {
        template.hasResourceProperties(
          'AWS::Lambda::Function',
          Match.objectLike({ FunctionName: 'TestStack-update-user' })
        );
      });

      test('get user ', () => {
        template.hasResourceProperties(
          'AWS::Lambda::Function',
          Match.objectLike({ FunctionName: 'TestStack-get-users' })
        );
      });
      test('delete user ', () => {
        template.hasResourceProperties(
          'AWS::Lambda::Function',
          Match.objectLike({ FunctionName: 'TestStack-delete-user' })
        );
      });
    });
  });
});
