import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDBStack extends Stack {
  public readonly ddbTable: ddb.Table;

  constructor(scope: Construct, appName: string, props?: StackProps) {
    super(scope, appName, props);

    // DynamoDB Table
    // TODO: change partition key to userID
    const ddbTable = new ddb.Table(this, 'ddbTable', {
      tableName: `${appName}`,
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'email', type: ddb.AttributeType.STRING },
    });
    this.ddbTable = ddbTable;

    ddbTable.addGlobalSecondaryIndex({
      indexName: `itemType-index`,
      partitionKey: { name: 'itemType', type: ddb.AttributeType.STRING },
      projectionType: ddb.ProjectionType.ALL,
    });
  }
}
