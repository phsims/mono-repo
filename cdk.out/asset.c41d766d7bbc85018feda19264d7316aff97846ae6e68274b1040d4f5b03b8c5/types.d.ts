import { StackProps } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export interface LambdaStackProps extends StackProps {
    userPool: UserPool;
    ddbTable?: Table;
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

export interface APIStackProps extends LambdaStackProps {
    lambdaFunctions: {
        [key: string]: NodejsFunction;
    };
}

export type APIPayloadValidationResult = {
    isValid: boolean;
    errors?: (string | undefined)[];
};

export type AddUserBody = {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    jobTitle: string;
    country: string;
};

export type User = {
    itemType: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    jobTitle: string;
    country: string;
};
export type DeleteUserParams = {
    email?: string;
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

export type GetUsersParams = {
    returnAttributes?: string;
    nextToken?: string;
    limit?: number;
    email?: string;
};
export type UpdateUserBody = {
    email: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    jobTitle?: string;
    country?: string;
};