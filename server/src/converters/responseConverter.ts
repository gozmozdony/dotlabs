export const partialContentResponseConverter = (data: any, message: string) => {
    return JSON.stringify({
        status: 206,
        message,
        ...data
    })
}

export const successResponseConverter = (data: any) => {
    return JSON.stringify({
        status: 200,
        message: 'OK',
        ...data
    });
}

export const badRequestResponseConverter = (data: any) => {
    return JSON.stringify({
        status: 400,
        message: 'Bad Request',
        description: data
    });
}

export const errorResponseConverter = (data: any) => {
    return JSON.stringify({
        status: 500,
        message: 'Internal Server Error',
        description: data
    });
}
