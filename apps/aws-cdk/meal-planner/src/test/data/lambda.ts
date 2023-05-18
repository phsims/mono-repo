export const LogsIAMPolicy = {
  Action: [
    'logs:CreateLogGroup',
    'logs:CreateLogStream',
    'logs:DescribeLogGroups',
    'logs:DescribeLogStreams',
    'logs:PutLogEvents',
  ],
  Effect: 'Allow',
};
export const DynamoIAMPolicy = {
  Action: [
    'dynamodb:BatchGetItem',
    'dynamodb:GetRecords',
    'dynamodb:GetShardIterator',
    'dynamodb:Query',
    'dynamodb:GetItem',
    'dynamodb:Scan',
    'dynamodb:ConditionCheckItem',
    'dynamodb:BatchWriteItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
    'dynamodb:DeleteItem',
    'dynamodb:DescribeTable',
  ],
  Effect: 'Allow',
};

export const LambdaLayerProperties = {
  CompatibleRuntimes: ['nodejs14.x'],
  Content: { S3Bucket: {} },
  Description: 'Lambda Layer for TestStack',
};
