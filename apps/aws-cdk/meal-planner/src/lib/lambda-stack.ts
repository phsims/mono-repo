import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaStackProps } from '../lambda-layer/types';

import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cwLogs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';

import { getLambdaDefinitions, getFunctionProps } from './lambda-config';

export class LambdaStack extends Stack {
  public readonly lambdaFunctions: {
    [key: string]: NodejsFunction;
  } = {};

  constructor(scope: Construct, appName: string, props: LambdaStackProps) {
    super(scope, appName, props);

    // Lambda Role
    const lambdaRole = new iam.Role(this, 'lambdaRole', {
      roleName: `${appName}-lambda-role`,
      description: `Lambda role for ${appName}`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
      ],
    });

    // Attach inline policies to Lambda role
    lambdaRole.attachInlinePolicy(
      new iam.Policy(this, 'lambdaExecutionAccess', {
        policyName: 'lambdaExecutionAccess',
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            resources: ['*'],
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:DescribeLogGroups',
              'logs:DescribeLogStreams',
              'logs:PutLogEvents',
            ],
          }),
        ],
      })
    );

    // Add DDB read write permissions to lambda role
    props.ddbTable.grantReadWriteData(lambdaRole);

    // Lambda Layer
    const lambdaLayer = new lambda.LayerVersion(this, 'lambdaLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-layer')),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
      description: `Lambda Layer for ${appName}`,
    });

    // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(appName, props.userPool);

    // Loop through the definitions and create lambda functions
    for (const lambdaDefinition of lambdaDefinitions) {
      // Get function props based on lambda definition
      let functionProps = getFunctionProps(
        lambdaDefinition,
        lambdaRole,
        lambdaLayer,
        appName
      );

      // Lambda Function
      const lambdaFunction = new NodejsFunction(
        this,
        `${lambdaDefinition.name}-function`,
        functionProps
      );
      this.lambdaFunctions[lambdaDefinition.name] = lambdaFunction;

      // Create corresponding Log Group with one month retention
      new cwLogs.LogGroup(this, `fn-${lambdaDefinition.name}-log-group`, {
        logGroupName: `/aws/lambda/${appName}-${lambdaDefinition.name}`,
        retention: cwLogs.RetentionDays.ONE_MONTH,
        removalPolicy: RemovalPolicy.DESTROY,
      });
    }
  }
}
