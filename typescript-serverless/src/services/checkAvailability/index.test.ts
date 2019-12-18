import { CheckAvailability } from "./index";
import { ServiceRequest, ServiceResponse } from "./interfaces-generated";
import * as moment from "moment";

describe("CheckAvailability", () => {
  function genRequestBase(): ServiceRequest {
    return {
      context: {
        dialogId: "a",
        dialogVersion: "2",
        fovConversationId: "asdf",
        platform: "alexa",
        request: {}
      },
      input: {
        amountOfPeople: 2,
        bookingTime: moment().toLocaleString(),
        room: "falcon"
      }
    };
  }

  test("dummy response is correct", async () => {
    const genericDataCurator = new CheckAvailability();
    const req = genRequestBase();
    const res = await genericDataCurator.run(req);
    const expectedRes: ServiceResponse = {
      choice: "available",
      output: {
        timeBufferAfterwards: 30,
        bookingSlot: moment()
          .add(2, "hours")
          .toLocaleString()
      }
    };
    expect(res).toEqual(expectedRes);
  });
});
