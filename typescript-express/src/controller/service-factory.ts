import {
  ExternalPlaceholderRequest,
  ServiceWorkflow
} from "controller/service-interfaces";

let routes;

interface Constructor<T> {
  new (...args: any[]): T;
}

export class ServiceFactory {
  public serviceName: string;
  public routes: { [route: string]: Constructor<ServiceWorkflow> } = {};

  constructor(serviceName: string) {
    let projectPath = "../services/routes";
    try {
      routes = require(projectPath).routes;
    } catch (e) {
      console.log(e);
      routes = null;
      return;
    }
    this.serviceName = serviceName.toLowerCase();
    Object.keys(routes).forEach(routeName => {
      this.routes[routeName.toLowerCase()] = routes[routeName];
    });
  }

  public serviceExists(): boolean {
    return !!this.routes[this.serviceName];
  }

  public getService(): ServiceWorkflow {
    return new this.routes[this.serviceName]();
  }
}
