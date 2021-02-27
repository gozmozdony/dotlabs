import {
    badRequestResponseConverter,
    errorResponseConverter, partialContentResponseConverter,
    successResponseConverter
} from "../../src/converters/responseConverter";

describe('Response converters', () => {
    describe('success converter function', () => {
        it('Should return with status adhering to API Governance', () => {
            const results: any[] = [];
            const expected = JSON.stringify({
                status: 200,
                message: 'OK',
                results
            });
            const result = successResponseConverter({ results });
            expect(result).toEqual(expected);
        });
    });

    describe('partial converter function', () => {
        it('Should return with status adhering to API Governance', () => {
            const results: any[] = [];
            const message = 'Partial message';
            const expected = JSON.stringify({
                status: 206,
                message,
                results
            });
            const result = partialContentResponseConverter({ results }, message);
            expect(result).toEqual(expected);
        });
    });

    describe('bad request response converter function', () => {
        it('Should return with status adhering to API Governance and the given error', () => {
            const error = new Error('There is a field missing');
            const expected = JSON.stringify({
                status: 400,
                message: 'Bad Request',
                description: error
            });
            const result = badRequestResponseConverter(error);
            expect(result).toEqual(expected);
        });
    });

    describe('error response converter function', () => {
        it('Should return with status adhering to API Governance and the given error', () => {
            const error = new Error('There was an internal server error');
            const expected = JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                description: error
            });
            const result = errorResponseConverter(error);
            expect(result).toEqual(expected);
        });
    });
});
