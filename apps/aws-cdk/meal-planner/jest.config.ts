/* eslint-disable */
export default {
  displayName: 'aws-cdk-meal-planner',
  preset: '../../../jest.preset.js',

  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/aws-cdk/meal-planner',
};
