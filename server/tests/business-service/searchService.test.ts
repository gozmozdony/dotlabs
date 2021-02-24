import Mock = jest.Mock;
import { Octokit } from "@octokit/rest";

import SearchServiceFactory, {ISearchService} from "../../src/business-service/searchService";
import { searchResultExample } from "../testData";
import {dataResponseConverter} from "../../src/converters/dataConverter";

describe('Search Business Service test', () => {
    let mockSearchFn: Mock;
    let mockOctokit;
    let service: ISearchService;

    beforeEach(() => {
        mockSearchFn = jest.fn();
        mockOctokit = {
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

            const result = await service.searchByUsername(queryParams);
            expect(mockSearchFn).toBeCalledWith({q: queryParams.name});
            expect(result).toEqual({
                totalCount: exampleData.total_count,
                items: dataResponseConverter(exampleData.items)
            });
        });

        it('After calling with multiple param, should return with results', async () => {
            const exampleData = {
                total_count: 1,
                incomplete_results: false,
                items: [
                    searchResultExample
                ]
            };
            const queryParams = { name: 'gozmozdony', page: 1, perPage: 1};
            mockSearchFn.mockResolvedValue({
                data: exampleData
            });

            const result = await service.searchByUsername(queryParams);
            expect(mockSearchFn).toBeCalledWith({
                q: queryParams.name,
                page: queryParams.page,
                per_page: queryParams.perPage
            });
            expect(result).toEqual({
                totalCount: exampleData.total_count,
                items: dataResponseConverter(exampleData.items)
            });
        });

        it('Should reject the request and throw an error', async () => {
            const queryParams = { name: 'gozmozdony'};
            const error = new Error('There was an error!');
            mockSearchFn.mockRejectedValue(error);
            try {
                await service.searchByUsername(queryParams);
            } catch(error) {
                expect(mockSearchFn).toBeCalledWith({q: queryParams.name});
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
