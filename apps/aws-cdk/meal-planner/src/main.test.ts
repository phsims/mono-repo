import { Stack, App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CognitoStack } from './lib/cognito-stack';
import { DynamoDBStack } from './lib/dynamodb-stack';
import { LambdaStack } from './lib/lambda-stack';
import { APIStack } from './lib/api-stack';

describe('main', () => {
  test('DynamoDBStack Stack', () => {
    const app = new App();

    const dynamoDBStack = new DynamoDBStack(
      app,
      'aws-cdk-meal-plannerTestStack'
    );

    Template.fromStack(dynamoDBStack as Stack).templateMatches({
      Resources: {},
    });
  });

  test('CognitoStack Stack', () => {
    const app = new App();
    const cognitoStack = new CognitoStack(app, 'aws-cdk-meal-plannerTestStack');

    Template.fromStack(cognitoStack as Stack).templateMatches({
      Resources: {},
    });
  });

  // test('LambdaStack Stack', () => {
  // const app = new App();
  //   const lambdaStack = new LambdaStack(app, 'aws-cdk-meal-plannerTestStack');

  //   Template.fromStack(lambdaStack as Stack).templateMatches({
  //     Resources: {},
  //   });
  // });

  // test('APIStack Stack', () => {
  // const app = new App();
  //   const apiStack = new APIStack(app, 'aws-cdk-meal-plannerTestStack');

  //   Template.fromStack(apiStack as Stack).templateMatches({
  //     Resources: {},
  //   });
  // });
});
