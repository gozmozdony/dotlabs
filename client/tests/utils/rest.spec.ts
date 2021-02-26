import {
  generateQueryParams,
  sendErrorMessage,
  sendLoadingMessage,
  sendSuccessMessage,
} from '@/utils/rest';
import { Subject } from 'rxjs';
import { SearchServiceMessage } from '@/search';
import Mock = jest.Mock;

describe('Rest utils', () => {
  describe('Query param string generator', () => {
    it('Should render user when passed', () => {
      const params = {
        name: 'octocat',
        perPage: 25,
        page: 1,
      };
      const result = generateQueryParams(params);
      expect(result).toEqual('name=octocat&perPage=25&page=1');
    });
  });

  describe('Send message utils', () => {
    let mockSubject: Subject<SearchServiceMessage>;
    let mockNextFn: Mock;
    beforeEach(() => {
      mockNextFn = jest.fn();
      mockSubject = {
        next: mockNextFn,
      } as any;
    });

    it('Should create and send a success message to the subject', () => {
      const dataExample = {
        items: [],
        totalCount: 0,
        message: 'OK',
      };
      sendSuccessMessage(mockSubject, dataExample);
      expect(mockNextFn).toBeCalledWith({
        users: [],
        count: 0,
        loading: false,
        error: false,
        message: 'OK',
      });
    });

    it('Should create and send an error message to the subject', () => {
      const error = new Error('There was an error!');
      sendErrorMessage(mockSubject, error);
      expect(mockNextFn).toBeCalledWith({
        users: [],
        count: 0,
        loading: false,
        error: true,
        message: error,
      });
    });

    it('Should create and send a loading message to the subject', () => {
      sendLoadingMessage(mockSubject);
      expect(mockNextFn).toBeCalledWith({
        users: [],
        count: 0,
        loading: true,
        error: false,
        message: '',
      });
    });
  });
});
