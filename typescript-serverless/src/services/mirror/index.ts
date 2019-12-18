import { ServiceWorkflow } from "controller/service-interfaces";
import { oc } from "ts-optchain";
import { ServiceRequest, ServiceResponse } from "./interfaces-generated";

export class Mirror implements ServiceWorkflow {
  public async run(request: ServiceRequest): Promise<ServiceResponse> {
    const choice = oc(request).input.branch();
    const outputProps = oc(request).input({});

    if (!choice) {
      return {
        choice: undefined,
        output: outputProps,
        error: {
          message:
            "the service input propert branch was not set, so the branch could not be returned"
        }
      };
    }

    delete outputProps.branch;

    return {
      choice,
      output: outputProps
    };
  }
}
