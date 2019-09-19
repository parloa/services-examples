import { APIGatewayProxyResult } from "aws-lambda";
import { ExternalPlaceholderResponse } from "./service-interfaces";

export class HttpResponseGenerator {
  public res: APIGatewayProxyResult = { statusCode: 200, body: null };

  public code(statusCode: number): HttpResponseGenerator {
    this.res.statusCode = statusCode;
    return this;
  }

  public errorMsg(msg: string): HttpResponseGenerator {
    return this.body({
      message: msg
    });
  }

  public body(body: any): HttpResponseGenerator {
    this.res.body = typeof body === "string" ? body : JSON.stringify(body);
    return this;
  }

  public build(): APIGatewayProxyResult {
    return this.res;
  }
}
