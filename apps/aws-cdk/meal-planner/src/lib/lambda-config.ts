import { Duration } from 'aws-cdk-lib';
import {
  LambdaDefinition,
  LambdaDefinitionProps,
  LambdaFunctionProps,
} from '../lambda-layer/types';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks';

// Returns lambda definitions with custom env
export const getLambdaDefinitions = ({
  id,
  userPool,
}: LambdaDefinitionProps): LambdaDefinition[] => {
  const lambdaDefinitions: LambdaDefinition[] = [];
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
    entry: `lambda-handlers/${lambdaDefinition.name}.ts`,
    runtime: Runtime.NODEJS_18_X,

    role: lambdaRole,
    layers: [lambdaLayer],
  };
  return functionProps;
};
