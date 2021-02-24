import { Octokit } from "@octokit/rest";
import { SearchQueryParams, SearchResult } from "../../types/search";
import {dataResponseConverter} from "../converters/dataConverter";

export interface ISearchService {
    searchByUsername( queryParameters: SearchQueryParams ): Promise<SearchResult>
}

const SearchServiceFactory = (octokit: Octokit): ISearchService => {
    return {
        searchByUsername: async (queryParameters) => {
            const results = await octokit.search.users({
                q: queryParameters.name,
                per_page: queryParameters.perPage,
                page: queryParameters.page,
            });

            const userRecords = await Promise.all(results.data.items.map(async (record) => (
                await octokit.users.getByUsername({
                    username: record.login
                })).data
            ));

            return {
                totalCount: results.data.total_count,
                items: dataResponseConverter(userRecords)
            } ;
        }
    }
}

export default SearchServiceFactory;
