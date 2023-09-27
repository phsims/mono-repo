import { zodiosNextApp } from '@zodios/express';
import { router } from 'meal-planner/api/router';

const server = zodiosNextApp();

server.use('/api', router);

export default server;
