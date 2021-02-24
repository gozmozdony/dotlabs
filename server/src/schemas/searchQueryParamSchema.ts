const schema: any = {
    type: "object",
    properties: {
        name: {type: "string"},
        page: {type: "number"},
        perPage: {type: "number"},
    },
    required: ["name"],
    additionalProperties: false,
};

export default schema;
