export const AssumeRolePolicyDocument = {
  Statement: [
    {
      Action: 'sts:AssumeRole',
      Effect: 'Allow',
      Principal: {
        Service: 'lambda.amazonaws.com',
      },
    },
  ],
};

export const ExecutionPolicyStatement = {
  Action: [
    'logs:CreateLogGroup',
    'logs:CreateLogStream',
    'logs:DescribeLogGroups',
    'logs:DescribeLogStreams',
    'logs:PutLogEvents',
  ],
  Effect: 'Allow',
};
export const RoleDocumentStatement = {
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
