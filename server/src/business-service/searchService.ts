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
            return {
                totalCount: results.data.total_count,
                items: dataResponseConverter(results.data.items)
            } ;
        }
    }
}

export default SearchServiceFactory;
