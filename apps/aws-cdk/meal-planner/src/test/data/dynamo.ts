export const AttributeDefinitions = [
  {
    AttributeName: 'PK',
    AttributeType: 'S',
  },
  {
    AttributeName: 'SK',
    AttributeType: 'S',
  },
  {
    AttributeName: 'GSI1PK',
    AttributeType: 'S',
  },
  {
    AttributeName: 'GSI1SK',
    AttributeType: 'S',
  },
  {
    AttributeName: 'GSI2PK',
    AttributeType: 'S',
  },
  {
    AttributeName: 'GSI2SK',
    AttributeType: 'N',
  },
];
export const GlobalSecondaryIndexes = [
  {
    IndexName: 'GSI1',
    KeySchema: [
      {
        AttributeName: 'GSI1PK',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'GSI1SK',
        KeyType: 'RANGE',
      },
    ],
    Projection: {
      ProjectionType: 'ALL',
    },
  },
  {
    IndexName: 'GSI2',
    KeySchema: [
      {
        AttributeName: 'GSI2PK',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'GSI2SK',
        KeyType: 'RANGE',
      },
    ],
    Projection: {
      ProjectionType: 'ALL',
    },
  },
];

export const KeySchema = [
  {
    AttributeName: 'PK',
    KeyType: 'HASH',
  },
  {
    AttributeName: 'SK',
    KeyType: 'RANGE',
  },
];
export const Resources = {
  Type: 'AWS::DynamoDB::Table',
  UpdateReplacePolicy: 'Delete',
  DeletionPolicy: 'Delete',
  Properties: {
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: AttributeDefinitions,
    GlobalSecondaryIndexes: GlobalSecondaryIndexes,
    KeySchema: KeySchema,
  },
};
