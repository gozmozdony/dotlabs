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
import {MAX_NUMBER_PER_PAGE} from "../constants/environment";
import { CORSHeaders } from "../utils/cors";

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
            return CORSHeaders({
                statusCode: 400,
                body: badRequestResponseConverter(validate.errors)
            });
        }

        const validatedParams = {
            name: queryParameters.name,
            page: Number(queryParameters.page) || undefined,
            perPage: Number(queryParameters.perPage) || undefined
        }

        if (validatedParams.perPage > MAX_NUMBER_PER_PAGE) {
            return CORSHeaders({
                statusCode: 400,
                body: badRequestResponseConverter(
                    `The maximum number for per page param is ${MAX_NUMBER_PER_PAGE}`
                )
            });
        }

        let response;
        try {
            response = await searchService.searchByUsername(validatedParams);
        } catch (error) {
            return CORSHeaders({
                statusCode: 500,
                body: errorResponseConverter(error)
            });
        }
        return CORSHeaders({
            statusCode: 200,
            body: successResponseConverter(response)
        });
    }
}

export default searchHandlerFactory;
