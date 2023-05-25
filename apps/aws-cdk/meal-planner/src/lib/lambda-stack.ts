
import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  Role,
  ServicePrincipal,
  ManagedPolicy,
  Policy,
  PolicyStatement,
  Effect,
} from 'aws-cdk-lib/aws-iam';
import { LayerVersion, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as path from 'path';

import { LambdaStackProps } from '../lambda-layer/types';
import { getLambdaDefinitions, getFunctionProps } from './lambda-config';

export class LambdaStack extends Stack {
  public readonly lambdaFunctions: {
    [key: string]: NodejsFunction;
  } = {};
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Lambda Role
    const lambdaRole = new Role(this, 'lambdaRole', {
      roleName: `${id}-lambda-role`,
      description: `Lambda role for ${id}`,
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
      ],
    });

    // Attach inline policies to Lambda role
    lambdaRole.attachInlinePolicy(
      new Policy(this, 'lambdaExecutionAccess', {
        policyName: 'lambdaExecutionAccess',
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
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
    props.table.grantReadWriteData(lambdaRole);

    // Lambda Layer
    const lambdaLayer = new LayerVersion(this, 'lambdaLayer', {
      code: Code.fromAsset(path.join(__dirname, '..', 'lambda-layer')),
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      description: `Lambda Layer for ${id}`,
    });

    // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(id, props.userPool);

    // Loop through the definitions and create lambda functions
    for (const lambdaDefinition of lambdaDefinitions) {
      // Get function props based on lambda definition
      let functionProps = getFunctionProps({
        id,
        lambdaDefinition,
        lambdaRole,
        lambdaLayer,
      });

      // Lambda Function
      const lambdaFunction = new NodejsFunction(
        this,
        `${lambdaDefinition.name}-function`,
        functionProps
      );
      this.lambdaFunctions[lambdaDefinition.name] = lambdaFunction;

      // Create corresponding Log Group with one month retention
      new LogGroup(this, `fn-${lambdaDefinition.name}-log-group`, {
        logGroupName: `/aws/lambda/${id}-${lambdaDefinition.name}`,
        retention: RetentionDays.ONE_MONTH,
        removalPolicy: RemovalPolicy.DESTROY,
      });
    }
  }
}
