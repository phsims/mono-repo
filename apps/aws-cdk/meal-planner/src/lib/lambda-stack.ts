import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Runtime, LayerVersion, Code } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

import { LambdaStackProps } from '../lambda-layer/types';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Lambda Role
    const lambdaRole = new Role(this, 'lambdaRole', {
      roleName: `${id}-lambda-role`,
      description: `Lambda role for ${id}`,
      assumedBy: new ServicePrincipal('amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
      ],
    });

    // Add DDB read write permissions to lambda role
    props.table.grantReadWriteData(lambdaRole);

    // Lambda Layer
    const lambdaLayer = new LayerVersion(this, 'lambdaLayer', {
      code: Code.fromAsset(path.join(__dirname, '../lambda-layer')),
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      description: `Lambda Layer for ${id}`,
    });

    // lambda function

    // const dynamoLambda = new Function(this, "DynamoLambdaHandler", {
    //   runtime: Runtime.NODEJS_18_X,
    //   code: Code.asset("functions"),
    //   handler: "function.handler",
    //   environment: {
    //     HELLO_TABLE_NAME: props.table.tableName,
    //   },
    // });
  }
}
