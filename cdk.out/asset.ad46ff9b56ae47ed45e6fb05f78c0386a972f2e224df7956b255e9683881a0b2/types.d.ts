import { StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
export interface LambdaStackProps extends StackProps {
  table: Table;
  userPool: UserPool
}
