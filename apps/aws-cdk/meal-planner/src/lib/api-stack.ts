// CDK
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  HttpLambdaAuthorizer,
  HttpLambdaResponseType,
} from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import {
  DomainName,
  HttpApi,
  CorsHttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { getLambdaDefinitions } from './lambda-config';
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks';
export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props: any) {
    super(scope, id, props);

    // // Define API Authorizer
    const apiAuthorizer = new HttpLambdaAuthorizer(
      'apiAuthorizer',
      props.lambdaFunctions['api-authorizer'],
      {
        authorizerName: `${id}-http-api-authorizer`,
        responseTypes: [HttpLambdaResponseType.SIMPLE],
      }
    );

    // Define HTTP API
    const httpApi = new HttpApi(this, 'httpApi', {
      apiName: `${id}-api`,
      description: `HTTP API for ${id}`,
      corsPreflight: {
        allowHeaders: ['Authorization', 'Content-Type'],
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.DELETE,
          CorsHttpMethod.PATCH,
        ],
        allowOrigins: ['*'],
      },
    });

    // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(id);

    // Loop through lambda definitions and create api routes if any
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
