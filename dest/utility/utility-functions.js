"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDefaultDate = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["Created"] = 201] = "Created";
    HttpStatus[HttpStatus["NoContent"] = 204] = "NoContent";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["Forbidden"] = 403] = "Forbidden";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
;
// вспомогательная функция взамен операции new Date(new Date().getTime() + 86400000),
// которая видимо из-за ошибки переполнения выдает 1970 год
const CreateDefaultDate = () => {
    const currentTime = new Date().getTime();
    const oneDayInMs = 86400000;
    const futureTime = currentTime + oneDayInMs;
    return (new Date(futureTime));
};
exports.CreateDefaultDate = CreateDefaultDate;
