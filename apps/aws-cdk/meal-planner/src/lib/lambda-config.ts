import { Duration } from 'aws-cdk-lib';
import {
  LambdaDefinition,
  LambdaDefinitionProps,
  LambdaFunctionProps,
} from '../lambda-layer/types';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks';

// Returns lambda definitions with custom env
export const getLambdaDefinitions = (
  id: string,
  userPool?: UserPool
): LambdaDefinition[] => {
  const environment = {
    DDB_TABLE: `${id}`,
  };
  const lambdaDefinitions: LambdaDefinition[] = [
    // {
    //   name: 'get-users',
    //   environment,
    //   api: {
    //     path: '/users',
    //     methods: [HttpMethod.GET],
    //   },
    // },
    {
      name: 'add-user',
      environment,
      api: {
        path: '/users',
        methods: [HttpMethod.POST],
      },
    },
    // {
    //   name: 'delete-user',
    //   environment,
    //   api: {
    //     path: '/users',
    //     methods: [HttpMethod.DELETE],
    //   },
    // },
    // {
    //   name: 'update-user',
    //   environment,
    //   api: {
    //     path: '/users',
    //     methods: [HttpMethod.PATCH],
    //   },
    // },
    // {
    //   name: 'api-authorizer',
    //   environment: { ...environment, USER_POOL_ID: userPool.userPoolId },
    // },
  ];
  return lambdaDefinitions;
};

// Returns Lambda Function properties with defaults and overwrites
export const getFunctionProps = ({
  id,
  lambdaDefinition,
  lambdaRole,
  lambdaLayer,
}: LambdaFunctionProps): NodejsFunctionProps => {
  const functionProps: NodejsFunctionProps = {
    functionName: `${id}-${lambdaDefinition.name}`,
    entry: path.join(
      __dirname,
      '..',
      'lambda-handlers',
      `${lambdaDefinition.name}.ts`
    ),
    runtime: Runtime.NODEJS_18_X,
    role: lambdaRole,
    layers: [lambdaLayer],
  };
  return functionProps;
};
