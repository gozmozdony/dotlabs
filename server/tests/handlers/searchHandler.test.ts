import Ajv from "ajv";
import { APIGatewayProxyEvent, APIGatewayProxyEventQueryStringParameters } from "aws-lambda";

import { ISearchService } from "../../src/business-service/searchService";
import searchHandlerFactory from "../../src/handlers/searchHandler";
import {MAX_NUMBER_PER_PAGE} from "../../src/constants/environment";

describe('Search Handler', () => {
    const validator = new Ajv();
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    };
    let mockSearchService: ISearchService;
    let mockSearchByUsername: jest.Mock;
    beforeEach(() => {
        mockSearchByUsername = jest.fn();
        mockSearchService = {
            searchByUsername: mockSearchByUsername,
        };
    })
    describe('handler function', () => {
        it('Should return with status OK and empty array of results with only one param', async () => {
            const expected = {
                headers,
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: 'OK',
                    total_count: 0,
                    items: []
                })
            };
            const queryStringParameters = { name: 'gozmozdony' } as any;
            mockSearchByUsername.mockResolvedValue({
                total_count: 0,
                items: []
            });
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).toBeCalledWith(queryStringParameters);
            expect(result).toEqual(expected);
        });

        it('Should return with status OK and empty array of results with multiple param', async () => {
            const expected = {
                headers,
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: 'OK',
                    totalCount: 0,
                    items: []
                })
            };
            const queryStringParameters = {
                name: 'gozmozdony',
                page: '1',
                perPage: '1'
            } as any;
            mockSearchByUsername.mockResolvedValue({
                totalCount: 0,
                items: []
            });
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).toBeCalledWith({
                ...queryStringParameters,
                page: Number(queryStringParameters.page),
                perPage: Number(queryStringParameters.perPage),
            });
            expect(result).toEqual(expected);
        });

        it('Should return with bad request when name param is missing', async () => {
            const expected = {
                headers,
                statusCode: 400,
                body: JSON.stringify({
                    status: 400,
                    message: 'Bad Request',
                    description: [
                        {
                            keyword: 'required',
                            dataPath: '',
                            schemaPath: '#/required',
                            params: { missingProperty: 'name' },
                            message: 'should have required property \'name\''
                        }
                    ]
                })
            };
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters: {}
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).not.toBeCalled();
            expect(result).toEqual(expected);
        });

        it('Should return with bad request when per page number is bigger than allowed', async () => {
            const expected = {
                headers,
                statusCode: 400,
                body: JSON.stringify({
                    status: 400,
                    message: 'Bad Request',
                    description: `The maximum number for per page param is ${MAX_NUMBER_PER_PAGE}`
                })
            };
            const queryStringParameters = {
                name: 'gozmozdony',
                perPage: '26'
            } as any;

            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).not.toBeCalled();
            expect(result).toEqual(expected);
        });

        it('Should return with bad request when param is contains non word character', async () => {
            const expected = {
                headers,
                statusCode: 400,
                body: JSON.stringify({
                    status: 400,
                    message: 'Bad Request',
                    description: [
                        {
                            keyword: 'pattern',
                            dataPath: '/name',
                            schemaPath: '#/properties/name/pattern',
                            params: { pattern: '^[a-zA-Z0-9_ .]*$' },
                            message: 'should match pattern "^[a-zA-Z0-9_ .]*$"'
                        }
                    ]
                })
            };


            mockSearchByUsername.mockResolvedValue({
                total_count: 0,
                items: []
            });
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters: {
                    name: "<hello>"
                } as APIGatewayProxyEventQueryStringParameters
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).not.toBeCalled();
            expect(result).toEqual(expected);
        });

        it('Should return with bad request when param "name" is shortet than min length', async () => {
            const expected = {
                headers,
                statusCode: 400,
                body: JSON.stringify({
                    status: 400,
                    message: 'Bad Request',
                    description: [
                        {
                            keyword: 'minLength',
                            dataPath: '/name',
                            schemaPath: '#/properties/name/minLength',
                            params: { limit: 3 },
                            message: 'should NOT have fewer than 3 characters'
                        }
                    ]
                })
            };


            mockSearchByUsername.mockResolvedValue({
                total_count: 0,
                items: []
            });
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters: {
                    name: "fo"
                } as APIGatewayProxyEventQueryStringParameters
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).not.toBeCalled();
            expect(result).toEqual(expected);
        });
    });
});
