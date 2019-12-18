import { ServiceRequest, ServiceResponse } from "./interfaces-generated";
import { ServiceWorkflow } from "controller/service-interfaces";
import * as moment from "moment";

export class CheckAvailability implements ServiceWorkflow {
  public async run(request: ServiceRequest): Promise<ServiceResponse> {
    return {
      choice: "available",
      output: {
        timeBufferAfterwards: 30,
        bookingSlot: moment()
          .add(2, "hours")
          .toLocaleString()
      }
    };
  }
}
