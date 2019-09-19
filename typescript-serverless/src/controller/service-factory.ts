import { routes } from "../services/routes";
import {
  ExternalPlaceholderRequest,
  ServiceWorkflow
} from "controller/service-interfaces";

type Constructor<T> = new (...args: any[]) => T;

export class ServiceFactory {
  public serviceName: string;
  public routes: { [route: string]: Constructor<ServiceWorkflow> } = {};

  constructor(serviceName: string) {
    this.serviceName = serviceName.toLowerCase();
    Object.keys(routes).forEach(routeName => {
      this.routes[routeName.toLowerCase()] = routes[routeName];
    });
  }

  public serviceExists(): boolean {
    return !!this.routes[this.serviceName];
  }

  public getService(): ServiceWorkflow {
    // public getService(): Constructor<ServiceWorkflow> {
    return new this.routes[this.serviceName]();
  }
}
