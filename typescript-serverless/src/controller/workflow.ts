import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { HttpResponseGenerator } from "./httpResponseGenerator";
import { ServiceFactory } from "./service-factory";

export class Workflow {
  constructor(private event: APIGatewayEvent, private context: Context) {}

  public async executeSafely(): Promise<APIGatewayProxyResult> {
    try {
      return await this.execute();
    } catch (err) {
      /* tslint:disable */
      const errorText = `### Error ###\nmessage: ${err.message};\nstack: ${err.stack}`;
      /* tslint:enable */
      return new HttpResponseGenerator()
        .code(500)
        .errorMsg(errorText)
        .build();
    }
  }

  public async execute(): Promise<APIGatewayProxyResult> {
    const serviceName = this.extractServiceName();
    const serviceFactory = new ServiceFactory(serviceName);
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
      obj = JSON.parse(this.event.body);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(
        `### Error ###\nmessage: ${err.message};\nstack: ${err.stack}`
      );
    }
    return obj;
  }

  private extractServiceName(): string {
    return this.event.path.replace("/", "").toLowerCase();
  }
}
