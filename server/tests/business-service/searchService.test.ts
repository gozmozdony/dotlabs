import Mock = jest.Mock;
import { Octokit } from "@octokit/rest";

import SearchServiceFactory, {ISearchService} from "../../src/business-service/searchService";
import { searchResultExample, userResultExample } from "../testData";
import {dataResponseConverter} from "../../src/converters/dataConverter";

describe('Search Business Service test', () => {
    let mockSearchFn: Mock;
    let mockGetByUsernameFn: Mock;
    let mockOctokit;
    let service: ISearchService;

    beforeEach(() => {
        mockSearchFn = jest.fn();
        mockGetByUsernameFn = jest.fn();
        mockOctokit = {
            users: {
                getByUsername: mockGetByUsernameFn
            } as any,
            search: {
                users: mockSearchFn
            } as any
        } as Octokit;
        service = SearchServiceFactory(mockOctokit);
    });

    describe('search by username', () => {
        it('After calling with one param, should return with results', async () => {
            const exampleData = {
                total_count: 1,
                incomplete_results: false,
                items: [
                    searchResultExample
                ]
            };
            const queryParams = { name: 'gozmozdony'};
            mockSearchFn.mockResolvedValue({
                data: exampleData
            });
            mockGetByUsernameFn.mockResolvedValue({ data: userResultExample });

            const result = await service.searchByUsername(queryParams);
            expect(mockSearchFn).toBeCalledWith({q: queryParams.name});
            expect(mockGetByUsernameFn).toBeCalledWith({username: queryParams.name});
            expect(result).toEqual({
                totalCount: exampleData.total_count,
                items: dataResponseConverter([userResultExample])
            });
        });

        it('After calling with multiple param, should return with results', async () => {
            const searchResultExample2 = {
                ...searchResultExample,
                name: 'gozmozdony2'
            }
            const exampleData = {
                total_count: 2,
                incomplete_results: false,
                items: [
                    searchResultExample,
                    searchResultExample2
                ]
            };
            const queryParams = { name: 'gozmozdony', page: 1, perPage: 1};
            mockSearchFn.mockResolvedValue({
                data: exampleData
            });
            mockGetByUsernameFn.mockResolvedValueOnce({ data: userResultExample });
            mockGetByUsernameFn.mockResolvedValueOnce({ data: userResultExample });

            const result = await service.searchByUsername(queryParams);
            expect(mockSearchFn).toBeCalledWith({
                q: queryParams.name,
                page: queryParams.page,
                per_page: queryParams.perPage
            });
            expect(mockGetByUsernameFn).toBeCalledTimes(2);
            expect(mockGetByUsernameFn).toHaveBeenNthCalledWith(1, {
                username: searchResultExample.login
            })
            expect(mockGetByUsernameFn).toHaveBeenNthCalledWith(2, {
                username: searchResultExample2.login
            })
            expect(result).toEqual({
                totalCount: exampleData.total_count,
                items: dataResponseConverter([
                    userResultExample,
                    userResultExample
                ])
            });
        });

        it('Should reject the search request and throw an error', async () => {
            const queryParams = { name: 'gozmozdony'};
            const error = new Error('There was an error!');
            mockSearchFn.mockRejectedValue(error);
            try {
                await service.searchByUsername(queryParams);
            } catch(error) {
                expect(mockSearchFn).toBeCalledWith({q: queryParams.name});
                expect(mockGetByUsernameFn).not.toBeCalled();
                expect(error).toEqual(error);
            }
        });

        it('Should reject the first get by username request and throw an error', async () => {
            const exampleData = {
                total_count: 1,
                incomplete_results: false,
                items: [
                    searchResultExample
                ]
            };
            const queryParams = { name: 'gozmozdony'};
            const error = new Error('There was an error!');
            mockSearchFn.mockResolvedValue({
                data: exampleData
            });
            mockGetByUsernameFn.mockRejectedValueOnce(error);
            try {
                await service.searchByUsername(queryParams);
            } catch(error) {
                expect(mockSearchFn).toBeCalledWith({q: queryParams.name});
                expect(mockGetByUsernameFn).toBeCalledTimes(1);
                expect(mockGetByUsernameFn).toHaveBeenNthCalledWith(1, {
                    username: searchResultExample.login
                });
                expect(error).toEqual(error);
            }
        });

        it('Should return with null result', async () => {
            const exampleData = {
                total_count: 0,
                incomplete_results: false,
                items: [] as any
            };
            const queryParams = { name: 'gozmozdony'};
            mockSearchFn.mockResolvedValue({
                data: exampleData
            });

            const result = await service.searchByUsername(queryParams);
            expect(mockSearchFn).toBeCalledWith({q: queryParams.name});
            expect(result).toEqual({
                totalCount: exampleData.total_count,
                items: exampleData.items

            });
        });
    });
});
