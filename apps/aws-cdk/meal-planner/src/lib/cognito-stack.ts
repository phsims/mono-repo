import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class CognitoStack extends Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, appName: string, props?: StackProps) {
    super(scope, appName, props);

    // Cognito Pool
    const userPool = new cognito.UserPool(this, 'userPool', {
      userPoolName: appName,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    this.userPool = userPool;

    // App Client
    const userPoolClient = new cognito.UserPoolClient(this, 'userPoolClient', {
      userPool: userPool,
      userPoolClientName: `${appName}-client`,
      authFlows: {
        userPassword: true,
      },
    });
    this.userPoolClient = userPoolClient;
  }
}
