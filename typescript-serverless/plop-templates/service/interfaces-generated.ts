import {
  GenericServiceRequest,
  GenericServiceResponse
} from "controller/service-interfaces";
import { ServiceInput, ServiceOutput, Branches } from "./interfaces";

export interface ServiceRequest extends GenericServiceRequest<ServiceInput> {}

export interface ServiceResponse
  extends GenericServiceResponse<Branches, ServiceOutput> {}
