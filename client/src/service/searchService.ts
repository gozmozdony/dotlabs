import { Subject } from 'rxjs';
import { User } from '@/types/search';

export type SearchServiceMessage = {
  users: User[];
  count: number;
  loading: boolean;
  message: string;
  error: boolean;
}

const subject = new Subject<SearchServiceMessage>();
// TODO refactor, working PoC with RxJS
const SearchService = {
  searchRequest: (username: string) => {
    fetch(
      `https://3437ls0jph.execute-api.eu-west-1.amazonaws.com/Prod/v1/github-service/search?name=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log(data);
        subject.next({
          users: data.items,
          count: data.totalCount,
          loading: false,
          error: false,
          message: data.message,
        });
      }).catch((error) => {
        subject.next({
          users: [],
          count: 0,
          loading: false,
          error: true,
          message: error,
        });
      });

    subject.next({
      users: [],
      count: 0,
      loading: true,
      error: false,
      message: '',
    });
  },
  clearSearch: () => subject.next(),
  getSearch: () => subject.asObservable(),
};

export default SearchService;
