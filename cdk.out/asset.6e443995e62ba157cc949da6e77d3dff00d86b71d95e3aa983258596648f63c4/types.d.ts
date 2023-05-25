import { StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Role } from 'aws-cdk-lib/aws-iam';
import { LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks';

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
  lambdaRole: Role;
  lambdaLayer: LayerVersion;
};
export type APIPayloadValidationResult = {
  isValid: boolean;
  errors?: (string | undefined)[];
};

export type AddUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
};

export type User = {
  itemType: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
};