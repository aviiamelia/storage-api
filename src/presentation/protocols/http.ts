/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
  statusCode: number;
  body: any;
  message?: string;
}
export interface HttpRequest {
  body?: any;
}
