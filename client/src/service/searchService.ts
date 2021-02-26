import { Observable, Subject } from 'rxjs';

import { DEFAULT_HEADERS as headers, DEFAULT_PAGE_SIZE } from '@/constants/rest';
import {
  generateQueryParams,
  sendErrorMessage,
  sendLoadingMessage,
  sendSuccessMessage,
} from '@/utils/rest';

import {
  SearchAPIResponse, SearchQueryParams, SearchServiceMessage, User,
} from '../../types/search';

export interface SearchServiceInterface {
  searchRequest(queryParams: SearchQueryParams): Promise<void>;
  observable(): Observable<SearchServiceMessage>;
  previousQueryParams: Partial<SearchQueryParams>;
}

export const SearchServiceFactory = (
  subject: Subject<SearchServiceMessage>,
): SearchServiceInterface => ({
  previousQueryParams: {},
  async searchRequest(queryParams: SearchQueryParams) {
    this.previousQueryParams = {
      perPage: DEFAULT_PAGE_SIZE,
      ...this.previousQueryParams,
      ...queryParams,
    };

    sendLoadingMessage(subject);

    await fetch(
      `${process.env.VUE_APP_API}?${generateQueryParams(this.previousQueryParams)}`,
      { headers },
    )
      .then((response: any) => response.json())
      .then((data: SearchAPIResponse) => {
        if (data.status === 500) sendErrorMessage(subject, data.message);
        if (data.status === 400) sendErrorMessage(subject, data.message);
        if (data.status === 200) sendSuccessMessage(subject, data);
      }).catch((error) => {
        sendErrorMessage(subject, error);
      });
  },
  observable: () => subject.asObservable(),
});

// Create instance
const subject = new Subject<SearchServiceMessage>();
const SearchService = SearchServiceFactory(subject);

export default SearchService;
