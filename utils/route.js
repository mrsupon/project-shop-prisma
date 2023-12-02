class Route {
  static _instance = null;

  constructor() {
    this.home = '/';
    this.login = '/login';
    this.dashboard = '/dashboard';
    if (!Route._instance) {
      Route._instance = this;
    }
    return Route._instance;
  }

  getInstance() {
    return this._instance;
  }
}

const route = new Route();
export default route;
