"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVideoFieldsValidation = void 0;
const basic_types_1 = require("../basic_types/basic-types");
const ifResolutionsMeetRequirements = (resolutions) => {
    if (resolutions && resolutions.length > 0) {
        resolutions.forEach((item) => {
            if (!Object.keys(basic_types_1.Resolution).includes(item)) {
                return false;
            }
        });
        return true;
    }
    return false;
};
const newVideoFieldsValidation = (request) => {
    const errorsArray = [];
    if (!request.body.title || typeof request.body.title !== "string") {
        errorsArray.push({ field: 'title', message: 'field is missing or has incorrect type' });
    }
    if (request.body.title && typeof request.body.title === 'string' && request.body.title.trim().length < 1) {
        errorsArray.push({ field: 'title', message: 'field has no symbols' });
    }
    if (request.body.title && typeof request.body.title === 'string' && request.body.title.trim().length > 40) {
        errorsArray.push({ field: 'title', message: 'field has more than 40 symbols' });
    }
    if (!request.body.author ||
        typeof request.body.author !== 'string') {
        errorsArray.push({ field: 'author', message: 'field "author" missing or incorrect type' });
    }
    if (request.body.author && typeof request.body.author === 'string' && request.body.author.trim().length < 1) {
        errorsArray.push({ field: 'author', message: 'field has no symbols' });
    }
    if (request.body.author && typeof request.body.author === 'string' && request.body.author.trim().length > 20) {
        errorsArray.push({ field: 'author', message: 'field has more than 20 symbols' });
    }
    //&& request.body.availableResolutions.every((item: Resolution) => Object.values(Resolution).includes(item))
    if (!Array.isArray(request.body.availableResolutions)) {
        errorsArray.push({ field: 'availableResolutions', message: 'field "availableResolutions" missing or incorrect type' });
    }
    if (Array.isArray(request.body.availableResolutions)) {
        if (!ifResolutionsMeetRequirements(request.body.availableResolutions)) {
            errorsArray.push({ field: 'availableResolutions', message: 'field(s) value is not allowed' });
        }
    }
    return errorsArray;
};
exports.newVideoFieldsValidation = newVideoFieldsValidation;
