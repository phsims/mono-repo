import { APIGatewayProxyResultV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import * as utils from '../lambda-layer/utils';
import {
  addUserSchema,
  validateAPISchema,
} from '../lambda-layer/schema-definitions';
import { User } from '../lambda-layer/types';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return new Promise<APIGatewayProxyResultV2>(async (resolve, reject) => {
    try {
      // Print Event
      utils.logInfo(event, 'Event');

      // Fetch Body from event
      const body: User = event.body ? JSON.parse(event.body) : {};

      // Validate Payload
      const validationResult = await validateAPISchema(addUserSchema, body);

      if (validationResult.isValid) {
        // Build User DDB Item
        const user: User = {
          itemType: 'User',
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          country: body.country,
        };

        // Write Item to DDB
        if (process.env.DDB_TABLE)
          await utils.ddbWrite(process.env.DDB_TABLE, user);

        // Return success message
        return resolve(
          await utils.apiSuccessResponse({ message: 'User added successfully' })
        );
      } else {
        // Return validation errors
        return resolve(
          await utils.apiErrorResponse(400, validationResult.errors?.join(','))
        );
      }
    } catch (error: any) {
      utils.logError(error);
      resolve(await utils.apiErrorResponse(500, error.message || error));
    }
  });
};
