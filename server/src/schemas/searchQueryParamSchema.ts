const schema: any = {
    type: "object",
    properties: {
        name: {
            type: "string",
            pattern: "^[a-zA-Z0-9_ .]*$"
        },
        page: {
            type: "string",
            pattern: "^\\d+$"
        },
        perPage: {
            type: "string",
            pattern: "^\\d+$"
        },
    },
    required: ["name"],
    additionalProperties: false,
};

export default schema;
