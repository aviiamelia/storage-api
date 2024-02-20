/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: { errorName: error.name, message: JSON.parse(error.message) },
  };
};

export const ok = (statusCode: number, data: any): HttpResponse => {
  return {
    statusCode: statusCode,
    body: data,
  };
};
