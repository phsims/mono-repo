import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';

export class CognitoStack extends Stack {
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Cognito Pool
    const userPool = new UserPool(this, 'userPool', {
      userPoolName: `${id}-pool`,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    this.userPool = userPool;

    // App Client
    const userPoolClient = new UserPoolClient(this, 'userPoolClient', {
      userPool: userPool,
      userPoolClientName: `${id}-client`,
      authFlows: {
        userPassword: true,
      },
    });
    this.userPoolClient = userPoolClient;
  }
}
