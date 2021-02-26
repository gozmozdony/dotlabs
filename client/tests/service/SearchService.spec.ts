import { Subject } from 'rxjs';

import { SearchServiceFactory, SearchServiceInterface } from '@/service/searchService';

import { SearchServiceMessage } from '../../types/search';
import Mock = jest.Mock;

describe('Search service Factory', () => {
  const api = 'https://api.example.com/';
  let mockSubject: Subject<SearchServiceMessage>;
  let mockNextFn: Mock;
  let mockFetch: Mock;
  let searchService: SearchServiceInterface;

  beforeEach(() => {
    mockNextFn = jest.fn();
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockSubject = {
      next: mockNextFn,
    } as any;
    searchService = SearchServiceFactory(mockSubject);
    process.env.VUE_APP_API = api;
  });

  afterEach(() => {
    process.env.VUE_APP_API = undefined;
    global.fetch = undefined as any;
  });

  it('Should call subject next with data', async () => {
    const response = {
      items: [],
      totalCount: 0,
      message: 'OK',
      statusCode: 200,
    };
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(response),
    } as any);
    expect(mockFetch).toBeCalledWith(`${api}?name=octocat`);
    expect(mockNextFn).toBeCalledTimes(2);
    expect(mockNextFn).toHaveBeenNthCalledWith(1, {
      users: [],
      count: 0,
      loading: true,
      error: false,
      message: '',
    });
    expect(mockNextFn).toHaveBeenNthCalledWith(2, {
      users: [],
      count: 0,
      loading: false,
      error: false,
      message: 'OK',
    });
  });
});
