import { StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';

export interface LambdaStackProps extends StackProps {
  table: Table;
  userPool: UserPool;
}

export type LambdaDefinition = {
  name: string;
  environment?: {
    [key: string]: string;
  };
  api?: {
    path: string;
    methods: HttpMethod[];
  };
};

export type LambdaDefinitionProps = {
  id: string;
  userPool: UserPool;
};

export type LambdaFunctionProps = {
  id: string;
  lambdaDefinition: LambdaDefinition;
  lambdaRole: iam.Role;
  lambdaLayer: lambda.LayerVersion;
};
