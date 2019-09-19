import { Handler, Context, APIGatewayProxyEvent } from "aws-lambda";
import { Workflow } from "./src/controller/workflow";

const entry: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  const workflow = new Workflow(event, context);
  return await workflow.executeSafely();
};

export { entry };
