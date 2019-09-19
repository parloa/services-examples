import { Service1 } from "./index";
import { Request, Response } from "./interfaces";

describe("Service1", () => {
  function genRequestBase(): Request {
    return {
      context: {
        dialogId: "a",
        sessionId: "b"
      },
      input: {
        nextNode: "nextNode",
        key1: "key1",
        value1: "value1"
      }
    };
  }

  test("nextNode is set and key value are returned", async () => {
    const genericDataCurator = new Service1();
    const req = genRequestBase();
    const res = await genericDataCurator.run(req);
    const expectedRes: Response = {
      choice: "nextNode",
      output: {
        key1: "value1"
      }
    };
    expect(res).toEqual(expectedRes);
  });
});
