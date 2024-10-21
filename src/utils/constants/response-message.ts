export default {
    SUCCESS: `The operation has been successful.`, //200
    SOMETHING_WENT_WRONG: `Something went wrong.`, //500
    TOO_MANY_REQUESTS: `Too many request! Please try again later.`, //429
    FILE_TOO_LARGE: `File is too large`, //413
    TOO_MANY_FILES: `Too many files uploaded`, //400

    NOT_FOUND: (entity: string) => `${entity} Not Found!`,
};
