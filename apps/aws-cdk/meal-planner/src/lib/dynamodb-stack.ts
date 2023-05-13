import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import {
  AttributeType,
  GlobalSecondaryIndexProps,
  Table,
  BillingMode,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DynamoDbStack extends Stack {
  public readonly table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    //setup table
    const table = new Table(this, `${id}-table`, {
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      sortKey: { name: 'SK', type: AttributeType.STRING },
    });
    this.table = table;

    // setup indexs
    const gsi1: GlobalSecondaryIndexProps = {
      indexName: 'GSI1',
      partitionKey: {
        name: 'GSI1PK',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI1SK',
        type: AttributeType.STRING,
      },
    };
    table.addGlobalSecondaryIndex(gsi1);

    const gsi2: GlobalSecondaryIndexProps = {
      indexName: 'GSI2',
      partitionKey: {
        name: 'GSI2PK',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI2SK',
        type: AttributeType.NUMBER,
      },
    };

    table.addGlobalSecondaryIndex(gsi2);
  }
}
