export type SearchResult = {
    items: any[],
    totalCount: number
}

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

export type SearchQueryParams = {
    name: string,
    page?: number,
    perPage?: number
}
