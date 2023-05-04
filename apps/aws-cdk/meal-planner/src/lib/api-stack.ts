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

// Types
import { APIStackProps } from '../lambda-layer/types';

export class APIStack extends Stack {
  constructor(scope: Construct, appName: string, props: APIStackProps) {
    super(scope, appName, props);

    // Define API Authorizer
    const apiAuthorizer = new HttpLambdaAuthorizer(
      'apiAuthorizer',
      props.lambdaFunctions['api-authorizer'],
      {
        authorizerName: `${appName}-http-api-authorizer`,
        responseTypes: [HttpLambdaResponseType.SIMPLE],
      }
    );

    // // Define Custom Domain
    // const apiDomain = new DomainName(this, 'apiDomain', {
    //   domainName: context.apiDomain,
    //   certificate: Certificate.fromCertificateArn(this, 'apiDomainCert', context.regionalCertArn),
    // });

    // // Add Route 53 entry for Api
    // new ARecord(this, 'apiDNSRecord', {
    //   zone: HostedZone.fromHostedZoneAttributes(this, 'apiHostedZone', {
    //     hostedZoneId: context.hostedZoneId,
    //     zoneName: context.baseDomain,
    //   }),
    //   recordName: context.apiDomain,
    //   target: RecordTarget.fromAlias(new ApiGatewayv2DomainProperties(apiDomain.regionalDomainName, apiDomain.regionalHostedZoneId)),
    // });

    // Define HTTP API
    const httpApi = new HttpApi(this, 'httpApi', {
      apiName: `${appName}-api`,
      description: `HTTP API Demo - ${appName}`,
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
      defaultAuthorizer: apiAuthorizer,
    });

    // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(appName, props.userPool);

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
