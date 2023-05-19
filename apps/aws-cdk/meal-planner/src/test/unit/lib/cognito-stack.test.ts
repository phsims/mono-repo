import { Stack, App, RemovalPolicy } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import '@aws-cdk/assert/jest';
import { UserPoolClientProps, UserPoolProps } from '../../data/cognito';
import { CognitoStack } from '../../../lib/cognito-stack';

describe('CognitoStack - Unit test', () => {
  test('UserPoolClient', () => {
    const app = new App();

    const stack = new CognitoStack(app, 'TestStack');
    const template = Template.fromStack(stack as Stack);

    template.hasResource('AWS::Cognito::UserPoolClient', {
      Properties: UserPoolClientProps,
    });
  });

  test('UserPool', () => {
    const app = new App();

    const stack = new CognitoStack(app, 'TestStack');
    const template = Template.fromStack(stack as Stack);

    template.hasResource('AWS::Cognito::UserPool', {
      Properties: UserPoolProps,
    });
  });
});
