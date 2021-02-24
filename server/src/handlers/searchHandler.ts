import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import Ajv from "ajv";

import schema from '../schemas/searchQueryParamSchema';
import { ISearchService } from "../business-service/searchService";
import {
    badRequestResponseConverter,
    errorResponseConverter,
    successResponseConverter
} from "../converters/responseConverter";

const searchHandlerFactory = (
    searchService: ISearchService,
    validator: Ajv,
) => {
    return async (
        event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
        const queryParameters = event.queryStringParameters;
        const validate = validator.compile(schema);
        const valid = validate(queryParameters);
        if (!valid) {
            return {
                statusCode: 400,
                body: badRequestResponseConverter(validate.errors)
            }
        }
        let response;
        try {
            // Todo change limit and fix type
            response = await searchService.searchByUsername(queryParameters as any);
        } catch (error) {
            return {
                statusCode: 500,
                body: errorResponseConverter(error)
            }
        }
        return {
            statusCode: 200,
            body: successResponseConverter(response)
        }
    }
}

export default searchHandlerFactory;
