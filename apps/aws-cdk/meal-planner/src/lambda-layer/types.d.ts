import { StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export interface LambdaStackProps extends StackProps {
  table: Table;
}
