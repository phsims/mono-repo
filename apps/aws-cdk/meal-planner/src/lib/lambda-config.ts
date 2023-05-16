import { Duration } from 'aws-cdk-lib';
import { LambdaDefinition } from '../lambda-layer/types';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Role } from 'aws-cdk-lib/aws-iam';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { join } from 'path';
// Constants
const DEFAULT_LAMBDA_MEMORY_MB = 1024;
const DEFAULT_LAMBDA_TIMEOUT_MINS = 15;

// Returns lambda definitions with custom env
export const getLambdaDefinitions = (
  id: string,
  userPool?: UserPool
): LambdaDefinition[] => {
  const environment = {
    DDB_TABLE: `${id}`,
  };
  const lambdaDefinitions: LambdaDefinition[] = [
    {
      name: 'get-users',
      environment,
      api: {
        path: '/users',
        methods: [HttpMethod.GET],
      },
    },
    {
      name: 'add-user',
      environment,
      api: {
        path: '/users',
        methods: [HttpMethod.POST],
      },
    },
    {
      name: 'delete-user',
      environment,
      api: {
        path: '/users',
        methods: [HttpMethod.DELETE],
      },
    },
    {
      name: 'update-user',
      environment,
      api: {
        path: '/users',
        methods: [HttpMethod.PATCH],
      },
    },
    {
      name: 'api-authorizer',
      environment: {
        ...environment,
        USER_POOL_ID: userPool ? userPool.userPoolId : 'UNKNOWN',
      },
    },
  ];
  return lambdaDefinitions;
};

// Returns Lambda Function properties with defaults and overwrites
export const getFunctionProps = (
  lambdaDefinition: LambdaDefinition,
  lambdaRole: Role,
  lambdaLayer: LayerVersion,
  id: string
): NodejsFunctionProps => {
  const functionProps: NodejsFunctionProps = {
    functionName: `${id}-${lambdaDefinition.name}`,
    entry: join(__dirname, `../handlers/${lambdaDefinition.name}.ts`),
    runtime: Runtime.NODEJS_18_X,
    memorySize: lambdaDefinition.memoryMB
      ? lambdaDefinition.memoryMB
      : DEFAULT_LAMBDA_MEMORY_MB,
    timeout: lambdaDefinition.timeoutMins
      ? Duration.minutes(lambdaDefinition.timeoutMins)
      : Duration.minutes(DEFAULT_LAMBDA_TIMEOUT_MINS),
    environment: lambdaDefinition.environment,
    role: lambdaRole,
    layers: [lambdaLayer],
  };
  return functionProps;
};
