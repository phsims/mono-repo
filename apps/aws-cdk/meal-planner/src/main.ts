import { App } from 'aws-cdk-lib';
import { AppStack } from './stacks/app-stack';

const app = new App();
new AppStack(app, 'aws-cdk-meal-planner');
