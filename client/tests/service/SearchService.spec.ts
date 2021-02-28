import { Subject } from 'rxjs';
import { mocked } from 'ts-jest/utils';

import * as RestUtils from '@/utils/rest';
import { DEFAULT_HEADERS, DEFAULT_PAGE_SIZE } from '@/constants/rest';
import { SearchServiceFactory, SearchServiceInterface } from '@/service/searchService';

import { SearchServiceMessage } from '@/types/search';
import Mock = jest.Mock;

jest.mock('@/utils/rest');

describe('Search service Factory', () => {
  const api = 'https://api.example.com/';
  let mockSubject: Subject<SearchServiceMessage>;
  let mockFetch: Mock;
  let mockJson: Mock;
  let mockRestUtils: {
    generateQueryParams: Mock;
    sendSuccessMessage: Mock;
    sendLoadingMessage: Mock;
    sendErrorMessage: Mock;
  };
  let mockSearchRequest: Mock;
  let mockAsObservable: Mock;
  let searchService: SearchServiceInterface;

  describe('Send search request', () => {
    beforeEach(() => {
      mockFetch = jest.fn();
      mockJson = jest.fn();

      mockRestUtils = mocked(RestUtils);
      mockRestUtils.generateQueryParams.mockClear();
      mockRestUtils.sendSuccessMessage.mockClear();
      mockRestUtils.sendLoadingMessage.mockClear();
      mockRestUtils.sendErrorMessage.mockClear();

      global.fetch = mockFetch;
      mockSubject = {} as any;

      searchService = SearchServiceFactory(mockSubject);
      process.env.VUE_APP_API = api;
    });

    afterEach(() => {
      process.env.VUE_APP_API = undefined;
      global.fetch = undefined as any;
    });

    it('Should call loading and success message when request is successful', async () => {
      const search = 'octocate';
      const response = {
        items: [],
        totalCount: 0,
        message: null,
        status: 200,
      };
      const generatedQuery = `name=${search}&page=1&perPage=${DEFAULT_PAGE_SIZE}`;

      mockRestUtils.generateQueryParams.mockReturnValue(generatedQuery);
      mockFetch.mockResolvedValue({
        json: mockJson,
      } as any);
      mockJson.mockReturnValue(response);

      await searchService.searchRequest({
        name: search,
      });
      expect(mockRestUtils.generateQueryParams).toBeCalledWith({
        name: search,
        page: 1,
        perPage: DEFAULT_PAGE_SIZE,
      });
      expect(mockRestUtils.sendLoadingMessage).toHaveBeenCalledWith(mockSubject);
      expect(mockFetch).toBeCalledWith(
        `${api}?${generatedQuery}`,
        { headers: DEFAULT_HEADERS },
      );
      expect(mockJson).toBeCalled();
      expect(mockRestUtils.sendSuccessMessage).toHaveBeenCalledWith(mockSubject, response);
    });

    it('Should call loading and error message when request - 500 is unsuccessful', async () => {
      const search = 'octocate';
      const response = {
        items: [],
        totalCount: 0,
        message: 'Internal Server Error',
        status: 500,
      };
      const generatedQuery = `name=${search}&page=1&perPage=${DEFAULT_PAGE_SIZE}`;

      mockRestUtils.generateQueryParams.mockReturnValue(generatedQuery);
      mockFetch.mockResolvedValue({
        json: mockJson,
      } as any);
      mockJson.mockReturnValue(response);

      await searchService.searchRequest({
        name: search,
      });
      expect(mockRestUtils.generateQueryParams).toBeCalledWith({
        name: search,
        page: 1,
        perPage: DEFAULT_PAGE_SIZE,
      });
      expect(mockRestUtils.sendLoadingMessage).toHaveBeenCalledWith(mockSubject);
      expect(mockFetch).toBeCalledWith(
        `${api}?${generatedQuery}`,
        { headers: DEFAULT_HEADERS },
      );
      expect(mockJson).toBeCalled();
      expect(mockRestUtils.sendSuccessMessage).not.toBeCalled();
      expect(mockRestUtils.sendErrorMessage).toHaveBeenCalledWith(mockSubject, response.message);
    });

    it('Should call loading and error message when request - 400 is unsuccessful', async () => {
      const search = 'octocate';
      const response = {
        items: [],
        totalCount: 0,
        message: 'Internal Server Error',
        status: 400,
      };
      const generatedQuery = `name=${search}&page=1&perPage=${DEFAULT_PAGE_SIZE}`;

      mockRestUtils.generateQueryParams.mockReturnValue(generatedQuery);
      mockFetch.mockResolvedValue({
        json: mockJson,
      } as any);
      mockJson.mockReturnValue(response);

      await searchService.searchRequest({
        name: search,
      });
      expect(mockRestUtils.generateQueryParams).toBeCalledWith({
        name: search,
        page: 1,
        perPage: DEFAULT_PAGE_SIZE,
      });
      expect(mockRestUtils.sendLoadingMessage).toHaveBeenCalledWith(mockSubject);
      expect(mockFetch).toBeCalledWith(
        `${api}?${generatedQuery}`,
        { headers: DEFAULT_HEADERS },
      );
      expect(mockJson).toBeCalled();
      expect(mockRestUtils.sendSuccessMessage).not.toBeCalled();
      expect(mockRestUtils.sendErrorMessage).toHaveBeenCalledWith(mockSubject, response.message);
    });

    it('Should call loading and error message when request is rejected', async () => {
      const search = 'octocat';
      const generatedQuery = `name=${search}&page=1&perPage=${DEFAULT_PAGE_SIZE}`;
      const error = new Error('Internal server error');
      mockRestUtils.generateQueryParams.mockReturnValue(generatedQuery);
      mockFetch.mockRejectedValue(error);

      await searchService.searchRequest({
        name: search,
      });
      expect(mockRestUtils.generateQueryParams).toBeCalledWith({
        name: search,
        page: 1,
        perPage: DEFAULT_PAGE_SIZE,
      });
      expect(mockRestUtils.sendLoadingMessage).toHaveBeenCalledWith(mockSubject);
      expect(mockFetch).toBeCalledWith(
        `${api}?${generatedQuery}`,
        { headers: DEFAULT_HEADERS },
      );
      expect(mockJson).not.toBeCalled();
      expect(mockRestUtils.sendSuccessMessage).not.toBeCalled();
      expect(mockRestUtils.sendErrorMessage).toHaveBeenCalledWith(mockSubject, error);
    });
  });

  describe('Paginator', () => {
    beforeEach(() => {
      mockSearchRequest = jest.fn();

      mockRestUtils = mocked(RestUtils);
      mockRestUtils.sendErrorMessage.mockClear();

      mockSubject = {} as any;

      searchService = SearchServiceFactory(mockSubject);
      searchService.searchRequest = mockSearchRequest;
    });

    it('Should call send error message', async () => {
      searchService.paginate(1, 5);
      expect(mockRestUtils.sendErrorMessage).toBeCalledWith(
        mockSubject,
        'There were no previous search!',
      );
      expect(mockSearchRequest).not.toBeCalled();
    });

    it('Should call search request with previous name', async () => {
      const page = 1;
      const perPage = 5;
      searchService.previousQueryParams = {
        name: 'octocat',
      };
      await searchService.paginate(page, perPage);
      expect(mockRestUtils.sendErrorMessage).not.toBeCalled();
      expect(mockSearchRequest).toBeCalledWith({
        ...searchService.previousQueryParams,
        page,
        perPage,
      });
    });
  });

  describe('Observable', () => {
    beforeEach(() => {
      mockAsObservable = jest.fn();
      mockSubject = {
        asObservable: mockAsObservable,
      } as any;
      searchService = SearchServiceFactory(mockSubject);
    });

    it('Should call send error message', async () => {
      const observable = {};
      mockAsObservable.mockReturnValue(observable);
      const result = searchService.observable();
      expect(mockAsObservable).toBeCalled();
      expect(result).toEqual(observable);
    });
  });
});
