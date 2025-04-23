import {Request} from "express";
import {FieldError, Resolution} from "../basic_types/basic-types";

const ifResolutionsMeetRequirements = (resolutions: Array<string>) :boolean => {
    if(resolutions && resolutions.length) {
        /*resolutions.every((item: string) => {
            if(!Object.keys(Resolution).includes(item)) {
                //console.log(item);
                return false;
            }
        })*/
        for (const item of resolutions) {
            if (!Object.keys(Resolution).includes(item)) {
                return false;
            }
        }
        return true;
    }

    return false;
};

export const newVideoFieldsValidation = (
    request: Request) :FieldError[] => {

    const errorsArray: FieldError[] = [];

    if(!request.body.title || typeof request.body.title !== "string")
    {
        errorsArray.push({field: 'title', message: 'field is missing or has incorrect type'});
    }

    if(request.body.title && typeof request.body.title === 'string' && request.body.title.trim().length < 1){
        errorsArray.push({field: 'title', message: 'field has no symbols'});
    }

    if(request.body.title && typeof request.body.title === 'string' && request.body.title.trim().length > 40){
        errorsArray.push({field: 'title', message: 'field has more than 40 symbols'});
    }

    if(!request.body.author ||
        typeof request.body.author !== 'string')
    {
        errorsArray.push({field: 'author', message: 'field "author" missing or incorrect type'});
    }

    if(request.body.author && typeof request.body.author === 'string' && request.body.author.trim().length < 1){
        errorsArray.push({field: 'author', message: 'field has no symbols'});
    }

    if(request.body.author && typeof request.body.author === 'string' && request.body.author.trim().length > 20){
        errorsArray.push({field: 'author', message: 'field has more than 20 symbols'});
    }
    //&& request.body.availableResolutions.every((item: Resolution) => Object.values(Resolution).includes(item))
    if(!Array.isArray(request.body.availableResolutions) ){
        errorsArray.push({field: 'availableResolutions', message: 'field "availableResolutions" missing or incorrect type'});
    }

    if(Array.isArray(request.body.availableResolutions)) {
        if (!ifResolutionsMeetRequirements(request.body.availableResolutions)) {
            errorsArray.push({field: 'availableResolutions', message: 'field(s) value is not allowed'});
        }
    }

    return errorsArray;
};