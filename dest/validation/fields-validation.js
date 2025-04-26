"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoFieldsValidation = exports.newVideoFieldsValidation = void 0;
const basic_types_1 = require("../basic_types/basic-types");
// вспомогательная функция проверки массива разрешений
const ifResolutionsMeetRequirements = (resolutions) => {
    if (resolutions && resolutions.length) {
        /*resolutions.every((item: string) => {
                if(!Object.keys(Resolution).includes(item)) {
                    //console.log(item);
                    return false;
                }
            })*/
        for (const item of resolutions) {
            if (!Object.keys(basic_types_1.Resolution).includes(item.trim())) {
                return false;
            }
        }
        return true;
    }
    return false;
};
//функция валидации вновь вносимых записей-карточек в БД
const newVideoFieldsValidation = (request) => {
    const errorsArray = [];
    //request.body.title.trim(); //почему-то это не срабатывает, изменения не вносятся
    if (!request.body.title || typeof request.body.title !== "string") {
        errorsArray.push({
            field: "title",
            message: "field is missing or has incorrect type",
        });
    }
    if (request.body.title &&
        typeof request.body.title === "string" &&
        request.body.title.trim().length < 1) {
        errorsArray.push({ field: "title", message: "field has no symbols" });
    }
    if (request.body.title &&
        typeof request.body.title === "string" &&
        request.body.title.trim().length > 40) {
        errorsArray.push({
            field: "title",
            message: "field has more than 40 symbols",
        });
    }
    if (!request.body.author || typeof request.body.author !== "string") {
        errorsArray.push({
            field: "author",
            message: 'field "author" missing or incorrect type',
        });
    }
    if (request.body.author &&
        typeof request.body.author === "string" &&
        request.body.author.trim().length < 1) {
        errorsArray.push({ field: "author", message: "field has no symbols" });
    }
    if (request.body.author &&
        typeof request.body.author === "string" &&
        request.body.author.trim().length > 20) {
        errorsArray.push({
            field: "author",
            message: "field has more than 20 symbols",
        });
    }
    //&& request.body.availableResolutions.every((item: Resolution) => Object.values(Resolution).includes(item))
    if (!Array.isArray(request.body.availableResolutions)) {
        errorsArray.push({
            field: "availableResolutions",
            message: 'field "availableResolutions" missing or incorrect type',
        });
    }
    if (Array.isArray(request.body.availableResolutions)) {
        if (!ifResolutionsMeetRequirements(request.body.availableResolutions)) {
            errorsArray.push({
                field: "availableResolutions",
                message: "field(s) value is not allowed",
            });
        }
    }
    return errorsArray;
};
exports.newVideoFieldsValidation = newVideoFieldsValidation;
//функция валидации PUT запросов с обновлениями в записи-карточки в БД
const updateVideoFieldsValidation = (request) => {
    const errorsArray = (0, exports.newVideoFieldsValidation)(request);
    if (!request.body.canBeDownloaded ||
        typeof request.body.canBeDownloaded !== "boolean") {
        errorsArray.push({
            field: "canBeDownloaded",
            message: "field is missing or has incorrect type",
        });
    }
    if (request.body.minAgeRestriction === undefined) {
        errorsArray.push({
            field: "minAgeRestriction",
            message: "field is missing",
        });
    }
    else if (typeof request.body.minAgeRestriction !== "number" ||
        !(request.body.minAgeRestriction > 0 && request.body.minAgeRestriction < 19)) {
        errorsArray.push({
            field: "minAgeRestriction",
            message: "field has incorrect value",
        });
    }
    if (!request.body.publicationDate) {
        errorsArray.push({ field: "publicationDate", message: "field is missing" });
    }
    else if (typeof request.body.publicationDate !== "string") {
        errorsArray.push({
            field: "publicationDate",
            message: "field is missing or has incorrect type",
        });
    }
    return errorsArray;
};
exports.updateVideoFieldsValidation = updateVideoFieldsValidation;
