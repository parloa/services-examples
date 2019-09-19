import { Request, Response } from "./interfaces";
import { ServiceWorkflow } from "controller/service-interfaces";

export class Service1 implements ServiceWorkflow {
  public async run(request: Request): Promise<Response> {
    this.nextNode =
      typeof request.input.nextNode === "string"
        ? request.input.nextNode
        : null;
    this.key1 =
      typeof request.input.key1 === "string" ? request.input.key1 : null;
    this.value1 =
      typeof request.input.value1 === "string" ? request.input.value1 : null;
    this.key2 =
      typeof request.input.key2 === "string" ? request.input.key2 : null;
    this.value2 =
      typeof request.input.value2 === "string" ? request.input.value2 : null;

    const output = {};

    output[this.key1] =
      this.key1 !== null ? (output[this.key1] = this.value1) : undefined;
    output[this.key2] =
      this.key2 !== null ? (output[this.key2] = this.value2) : undefined;

    return {
      choice: this.nextNode,
      output
    };
  }

  private nextNode: string;
  private key1: string;
  private value1: string;
  private key2: string;
  private value2: string;
}
