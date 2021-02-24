import Ajv from "ajv";
import { APIGatewayProxyEvent } from "aws-lambda";

import {ISearchService} from "../../src/business-service/searchService";
import searchHandlerFactory from "../../src/handlers/searchHandler";

describe('Search Handler', () => {
    const validator = new Ajv();
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
                page: 1,
                perPage: 1
            } as any;
            mockSearchByUsername.mockResolvedValue({
                totalCount: 0,
                items: []
            });
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).toBeCalledWith(queryStringParameters);
            expect(result).toEqual(expected);
        });

        it('Should return with bad request when name param is missing', async () => {
            const expected = {
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


            mockSearchByUsername.mockResolvedValue({
                total_count: 0,
                items: []
            });
            const result = await searchHandlerFactory(mockSearchService, validator)({
                queryStringParameters: {}
            } as APIGatewayProxyEvent);
            expect(mockSearchByUsername).not.toBeCalled();
            expect(result).toEqual(expected);
        });
    });
});
