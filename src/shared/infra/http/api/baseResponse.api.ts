export default class BaseHttpResponse {
  constructor(
    public readonly data: any = {},
    public readonly error: object | null = null,
    public readonly statusCode: number
  ) {}

  static success(data: any, statusCode = 200) {
    return new BaseHttpResponse(data, null, statusCode)
  }

  static failed(err: any, statusCode = 400) {
    return new BaseHttpResponse(null, err, statusCode)
  }
}