import { User } from "../../types/search";

export const dataResponseConverter = (data: any[]): User[] => data.map((record) => {
    return {
        name: record.login,
        url: record.html_url,
        profilePic: record.avatar_url,
        followers: 0,
        following: 0
    }
})
