export type User = {
  name: string;
  email: string | null;
  username: string;
  followers: number;
  following: number;
  publicRepos: number;
  profilePic: string;
  url: string;
}

export type SearchServiceMessage = {
  users: User[];
  count: number;
  loading: boolean;
  message: string;
  error: boolean;
}

export type SearchQueryParams = {
  name: string;
  page?: number;
  perPage?: number;
}

export type SearchAPIResponse = {
  status: number,
  message: string,
  totalCount: number;
  items: User[];
}
