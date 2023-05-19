import { Stack, App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CognitoStack } from '../../../lib/cognito-stack';

test('CognitoStack Stack', () => {
  const app = new App();

  const stack = new CognitoStack(app, 'TestStack');
  const template = Template.fromStack(stack as Stack);

  expect(template).toMatchSnapshot('TestStack');
});
