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
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: badRequestResponseConverter(validate.errors)
            }
        }

        const validatedParams = {
            name: queryParameters.name,
            page: Number(queryParameters.page) || undefined,
            perPage: Number(queryParameters.perPage) || undefined
        }

        if (validatedParams.perPage > MAX_NUMBER_PER_PAGE) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: badRequestResponseConverter(
                    `The maximum number for per page param is ${MAX_NUMBER_PER_PAGE}`
                )
            }
        }

        let response;
        try {
            response = await searchService.searchByUsername(validatedParams);
        } catch (error) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: errorResponseConverter(error)
            }
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: successResponseConverter(response)
        }
    }
}

export default searchHandlerFactory;
