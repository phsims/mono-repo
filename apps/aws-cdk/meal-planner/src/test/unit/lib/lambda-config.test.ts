import { Stack, App, RemovalPolicy } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Role } from 'aws-cdk-lib/aws-iam';

import {
  getFunctionProps,
  getLambdaDefinitions,
} from '../../../lib/lambda-config';
import {
  testLambdaDefinition,
  expectedLambdaDefinition,
} from '../../data/lambda';
describe('APIStack - Unit tests', () => {
  const app = new App();
  const testStack = new Stack(app, 'TestStack');
  const userPool = new UserPool(testStack, 'testUserPool');
  const role = new Role(testStack, 'testRole', {});

  test('getFunctionProps', () => {
    getFunctionProps(
      'testid',
      testLambdaDefinition,
      testLambdaRole,
      testLambdaLayer
    );
  });

  test('getLambdaDefinitions', () => {
    const lambdaDefinitions = getLambdaDefinitions('testid', userPool);
    expect(lambdaDefinitions).toEqual(expectedLambdaDefinition);
  });
});
