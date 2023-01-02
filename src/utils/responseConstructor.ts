import { STATUS_CODES } from "../constants/api.enum";
import { ReturnType } from "../types/api.types";

const {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER
} = STATUS_CODES;

/**
 * Construct a json response object to be used as the return value of an API call
 * @param code HTTP status code
 * @param error an error object OR error message (if any)
 * @param data content of the data returned by the services/repositories
 * @returns a json response object
 */
export const responseConstructor = (code: number, error?: string | any, data?: any): ReturnType => {
  let result: ReturnType = { success: true, code };

  // ERROR
  if (!!error) {
    const message = !!error.message ? error.message : error;
    result = {
      success: false,
      message,
      code
    }
    return result;
  }

  // SUCCESS
  if (!!data) result.data = data;
  return result;
}

export const getSuccessResponse = (data?: any) => responseConstructor(
  OK,
  "",
  data
) 

export const getCreatedResponse = (data?: any) => responseConstructor(
  CREATED,
  "",
  data
);

/**
 * Construct a json response object for a BAD REQUEST error
 * @param message error message
 * @returns a json response object
 */
export const getBadRequestResponse = (message: string) => responseConstructor(
  BAD_REQUEST,
  message
);

/**
 * Construct a json response object for a NOT FOUND error
 * @param message error message
 * @returns a json response object
 */
export const getNotFoundResponse = (message: string) => responseConstructor(
  NOT_FOUND,
  message
)

export const getInternalServerErrorResponse = (message: string) => responseConstructor(
  INTERNAL_SERVER,
  message
);