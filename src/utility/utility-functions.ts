export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,

  InternalServerError = 500,
}

// вспомогательная функция взамен операции new Date(new Date().getTime() + 86400000),
// которая видимо из-за ошибки переполнения выдает 1970 год
export const CreateDefaultDate = (): Date => {
  const currentTime = new Date().getTime();
  const oneDayInMs = 86400000;
  const futureTime = currentTime + oneDayInMs;

  return new Date(futureTime);
};
