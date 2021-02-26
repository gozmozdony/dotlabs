export const CORSHeaders = (response: any) => {
    return {
        ...response,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    };
}
