import { Mirror } from "./index";
import { ServiceRequest, ServiceResponse } from "./interfaces-generated";

describe("mock", () => {
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
        someKey: "value"
      }
    };
  }

  test("nextNode is set", async () => {
    const mirror = new Mirror();
    const req = genRequestBase();
    req.input.branch = "nextNode";
    const res = await mirror.run(req);
    const expectedRes: ServiceResponse = {
      choice: "nextNode",
      output: {
        someKey: "value"
      }
    };
    expect(res).toEqual(expectedRes);
  });

  test("nextNode is not set", async () => {
    const mirror = new Mirror();
    const req = genRequestBase();
    const res = await mirror.run(req);
    expect(res.error).toBeTruthy();
    expect(res.error.message).toBeTruthy();
    expect(res.output).toEqual({ someKey: "value" });
  });
});
