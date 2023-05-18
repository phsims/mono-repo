import { Stack, App } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import '@aws-cdk/assert/jest';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { AllowMethods, AllowOrigins } from '../../data/api';
import { DynamoDbStack } from '../../../lib/dynamodb-stack';
import { CognitoStack } from '../../../lib/cognito-stack';
import { LambdaStack } from '../../../lib/lambda-stack';

import { APIStack } from '../../../lib/api-stack';

describe('DynamoDbStack - Unit test', () => {
  const app = new App();

  const dynamoStack = new DynamoDbStack(app, 'TestDynamoStack');
  const cognitoStack = new CognitoStack(app, 'TestCognitoStack');

  const table = new Table(dynamoStack, `TestStack-table`, {
    partitionKey: { name: 'testPK', type: AttributeType.STRING },
  });
  const userPool = new UserPool(cognitoStack, `TestStack-pool`, {
    userPoolName: 'test-pool',
  });

  const lambdaStack = new LambdaStack(app, 'TestLambdaStack', {
    table: table,
    userPool: userPool,
  });
  const stack = new APIStack(app, 'TestStack', {
    lambdaFunctions: lambdaStack.lambdaFunctions,
    userPool: userPool,
  });

  const template = Template.fromStack(stack as Stack);

  describe('ApiStack - Unit tests', () => {
    test('API', () => {
      template.hasResourceProperties(
        'AWS::ApiGatewayV2::Api',
        Match.objectLike({
          CorsConfiguration: {
            AllowMethods: AllowMethods,
            AllowOrigins: AllowOrigins,
          },
        })
      );
    });

    test('Route', () => {
      template.hasResourceProperties(
        'AWS::ApiGatewayV2::Route',
        Match.objectLike({ RouteKey: 'DELETE /users' })
      );
      template.hasResourceProperties(
        'AWS::ApiGatewayV2::Route',
        Match.objectLike({ RouteKey: 'GET /users' })
      );
      template.hasResourceProperties(
        'AWS::ApiGatewayV2::Route',
        Match.objectLike({ RouteKey: 'PATCH /users' })
      );
      template.hasResourceProperties(
        'AWS::ApiGatewayV2::Route',
        Match.objectLike({ RouteKey: 'POST /users' })
      );
    });

    test('Authorizer', () => {
      template.hasResourceProperties('AWS::ApiGatewayV2::Authorizer', {});
    });
  });
});
