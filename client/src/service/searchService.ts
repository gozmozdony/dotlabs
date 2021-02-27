import { Observable, Subject } from 'rxjs';

import { DEFAULT_HEADERS as headers, DEFAULT_PAGE_SIZE } from '@/constants/rest';
import {
  generateQueryParams,
  sendErrorMessage,
  sendLoadingMessage,
  sendSuccessMessage,
} from '@/utils/rest';

import {
  SearchAPIResponse, SearchQueryParams, SearchServiceMessage,
} from '@/types/search';

export interface SearchServiceInterface {
  searchRequest(queryParams: SearchQueryParams): Promise<void>;
  observable(): Observable<SearchServiceMessage>;
  paginate(page: number, perPage: number): Promise<void>;
  previousQueryParams: SearchQueryParams;
}

export const SearchServiceFactory = (
  subject: Subject<SearchServiceMessage>,
): SearchServiceInterface => ({
  previousQueryParams: {
    name: '',
    page: 1,
    perPage: DEFAULT_PAGE_SIZE,
  },
  async searchRequest(queryParams: SearchQueryParams) {
    sendLoadingMessage(subject);

    await fetch(
      `${process.env.VUE_APP_API}?${generateQueryParams({
        ...this.previousQueryParams,
        ...queryParams,
      })}`,
      { headers },
    )
      .then((response: any) => response.json())
      .then((data: SearchAPIResponse) => {
        if (data.status === 500) sendErrorMessage(subject, data.message);
        if (data.status === 400) sendErrorMessage(subject, data.message);
        if (data.status === 206) {
          sendSuccessMessage(subject, {
            ...data,
            totalCount: 1000,
            message: `Original total: ${data.totalCount}`,
          });

          this.previousQueryParams = {
            ...this.previousQueryParams,
            ...queryParams,
          };
        }
        if (data.status === 200) {
          sendSuccessMessage(subject, {
            ...data,
            message: null,
          });

          this.previousQueryParams = {
            ...this.previousQueryParams,
            ...queryParams,
          };
        }
      }).catch((error) => {
        sendErrorMessage(subject, error);
      });
  },
  async paginate(page: number, perPage: number) {
    if (!this.previousQueryParams.name) {
      sendErrorMessage(subject, 'There were no previous search!');
    } else {
      await this.searchRequest({
        ...this.previousQueryParams,
        page,
        perPage,
      });
    }
  },
  observable: () => subject.asObservable(),
});

// Create instance
const subject = new Subject<SearchServiceMessage>();
const SearchService = SearchServiceFactory(subject);

export default SearchService;
