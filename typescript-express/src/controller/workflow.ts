import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { HttpResponseGenerator } from "./httpResponseGenerator";
import { ServiceFactory } from "./service-factory";

export class Workflow {
  constructor(private request: any) {}

  public async executeSafely(): Promise<APIGatewayProxyResult> {
    try {
      return await this.execute();
    } catch (err) {
      const errorText = `### Error ###\nmessage: ${err.message};\nstack: ${
        err.stack
      }`;
      return new HttpResponseGenerator()
        .code(500)
        .errorMsg(errorText)
        .build();
    }
  }

  public async execute(): Promise<APIGatewayProxyResult> {
    const serviceName = this.request.path.replace("/", "").toLowerCase();
    const serviceFactory = new ServiceFactory(
      serviceName
    );
    if (!serviceFactory.serviceExists()) {
      return new HttpResponseGenerator().code(404).build();
    }

    const body = this.parseBody();
    if (!body) {
      return new HttpResponseGenerator()
        .errorMsg("body is not parsable")
        .code(400)
        .build();
    }

    const service = serviceFactory.getService();
    const serviceRes = await service.run(body);

    return new HttpResponseGenerator().body(serviceRes).build();
  }

  private parseBody(): any {
    let obj: any;
    try {
      obj = this.request.body;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(
        `### Error ###\nmessage: ${err.message};\nstack: ${err.stack}`
      );
    }
    return obj;
  }
}
