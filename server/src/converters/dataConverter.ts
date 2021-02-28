import { User } from "../../types/search";

export const dataResponseConverter = (data: any[]): User[] => data.map((record) => {
    return {
        name: record.name,
        email: record.email,
        username: record.login,
        url: record.html_url,
        publicRepos: record.public_repos,
        profilePic: record.avatar_url,
        followers: record.followers,
        following: record.following,
        bio: record.bio
    }
})
