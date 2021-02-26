import { Subject } from 'rxjs';
import { SearchServiceMessage } from '../../types/search';

export const generateQueryParams = (
  data: { [key: string]: string | number | undefined },
): string => Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');

export const sendSuccessMessage = (subject: Subject<SearchServiceMessage>, data: any) => {
  subject.next({
    users: data.items,
    count: data.totalCount,
    loading: false,
    error: false,
    message: data.message,
  });
};

export const sendLoadingMessage = (subject: Subject<SearchServiceMessage>) => {
  subject.next({
    users: [],
    count: 0,
    loading: true,
    error: false,
    message: '',
  });
};

export const sendErrorMessage = (subject: Subject<SearchServiceMessage>, error: any) => {
  subject.next({
    users: [],
    count: 0,
    loading: false,
    error: true,
    message: error,
  });
};
