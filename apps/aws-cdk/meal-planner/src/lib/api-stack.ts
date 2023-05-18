import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import {
  HttpLambdaAuthorizer,
  HttpLambdaResponseType,
} from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { HttpApi, CorsHttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';

import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

import { getLambdaDefinitions } from './lambda-config';

// Types
import { APIStackProps } from '../lambda-layer/types';

export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props: APIStackProps) {
    super(scope, id, props);

    // Define API Authorizer
    const apiAuthorizer = new HttpLambdaAuthorizer(
      'apiAuthorizer',
      props.lambdaFunctions['api-authorizer'],
      {
        authorizerName: `${id}-http-api-authorizer`,
        responseTypes: [HttpLambdaResponseType.SIMPLE],
      }
    );

    // // Define HTTP API
    const httpApi = new HttpApi(this, 'httpApi', {
      apiName: `${id}-api`,
      description: `HTTP API - ${id}`,
      corsPreflight: {
        allowHeaders: ['Authorization', 'Content-Type'],
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.DELETE,
          CorsHttpMethod.PATCH,
        ],
        allowOrigins: ['*'],
      },
      defaultAuthorizer: apiAuthorizer,
    });

    // // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(id, props.userPool);

    // // Loop through lambda definitions and create api routes if any
    for (const lambdaDefinition of lambdaDefinitions) {
      if (lambdaDefinition.api) {
        httpApi.addRoutes({
          path: lambdaDefinition.api.path,
          methods: lambdaDefinition.api.methods,
          integration: new HttpLambdaIntegration(
            `${lambdaDefinition.name}-integration`,
            props.lambdaFunctions[lambdaDefinition.name]
          ),
        });
      }
    }
  }
}
