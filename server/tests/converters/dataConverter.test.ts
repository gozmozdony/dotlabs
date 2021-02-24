import { userResultExample } from "../testData";
import { dataResponseConverter } from "../../src/converters/dataConverter";

describe('Data converters', () => {
    describe('successfully convert data', () => {
        it('Should return with transformed array', () => {
            const expected =[
                {
                    name: userResultExample.name,
                    email: userResultExample.email,
                    username: userResultExample.login,
                    followers: userResultExample.followers,
                    following: userResultExample.following,
                    publicRepos: userResultExample.public_repos,
                    profilePic: userResultExample.avatar_url,
                    url: userResultExample.html_url,
                }

            ];
            const result = dataResponseConverter([{ ...userResultExample }]);
            expect(result).toEqual(expected);
        });
    });
});
