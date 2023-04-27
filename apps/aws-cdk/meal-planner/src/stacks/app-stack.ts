import { Stack, App, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
export class AppStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const userpool = new cognito.UserPool(this, 'mealplanner', {
      userPoolName: 'mealplanner-userpool',
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: 'You need to verify your email',
        emailBody: 'Thanks for signing up Your verification code is {####}', // # This placeholder is a must if code is selected as preferred verification method
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        familyName: {
          mutable: false,
          required: true,
        },
        address: {
          mutable: true,
          required: false,
        },
      },
      customAttributes: {
        tenantId: new cognito.StringAttribute({
          mutable: false,
          minLen: 10,
          maxLen: 15,
        }),
        createdAt: new cognito.DateTimeAttribute(),
        employeeId: new cognito.NumberAttribute({
          mutable: false,
          min: 1,
          max: 100,
        }),
        isAdmin: new cognito.BooleanAttribute({
          mutable: false,
        }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // userpool.addClient('mealplaner-client', {
    //   userPoolClientName: 'mealplaner-client',
    //   authFlows: {
    //     userPassword: true,
    //   },
    // });
  }
}
