import {
  ExternalPlaceholderRequest,
  ExternalPlaceholderResponse
} from "controller/service-interfaces";

export interface ServiceInput {
  nextNode: string;
  key1?: string;
  value1?: string;
  key2?: string;
  value2?: string;
}

export interface ServiceOutput {
  // only strings are allowed as type
  key1?: string;
  value1?: string;
  key2?: string;
  value2?: string;
}

export interface Request extends ExternalPlaceholderRequest<ServiceInput> {}
export interface Response
  extends ExternalPlaceholderResponse<string, ServiceOutput> {}
