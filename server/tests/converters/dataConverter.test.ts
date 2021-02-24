import { searchResultExample } from "../testData";
import {dataResponseConverter} from "../../src/converters/dataConverter";

describe('Data converters', () => {
    describe('successfully convert data', () => {
        it('Should return with transformed array', () => {
            const expected =[
                {
                    name: searchResultExample.login,
                    url: searchResultExample.html_url,
                    profilePic: searchResultExample.avatar_url,
                    followers: 0,
                    following: 0
                }
            ];
            const result = dataResponseConverter([{ ...searchResultExample }]);
            expect(result).toEqual(expected);
        });
    });
});
