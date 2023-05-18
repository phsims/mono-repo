import { StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';

export interface LambdaStackProps extends StackProps {
  table: Table;
  userPool: UserPool;
}

export interface APIStackProps extends StackProps {
  userPool: UserPool;
  lambdaFunctions: {
    [key: string]: NodejsFunction;
  };
}

export type LambdaDefinition = {
  name: string;
  memoryMB?: number;
  timeoutMins?: number;
  environment?: {
    [key: string]: string;
  };
  api?: {
    path: string;
    methods: HttpMethod[];
  };
};

export type APIAuthorizerEvent = {
  headers: {
    authorization: string;
  };
  requestContext: {
    http: {
      method: string;
      path: string;
    };
  };
};
export type APIAuthValidationResult = {
  isAuthorized: boolean;
};
export type APIPayloadValidationResult = {
  isValid: boolean;
  errors?: (string | undefined)[];
};

export type User = {
  itemType: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
};
export type GetUsersParams = {
  returnAttributes?: string;
  nextToken?: string;
  limit?: number;
  email?: string;
  country?: string;
};

export type UpdateUserBody = {
  email: string;
  firstName?: string;
  lastName?: string;
  country?: string;
};
export type DeleteUserParams = {
  email?: string;
};