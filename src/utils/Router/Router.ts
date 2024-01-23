import Block from '../../components/Block/Block.ts';

export interface BlockConstructable<P extends Record<string, unknown> = any> {
  new(props: P): Block<P>;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;

  private readonly pathname: string;

  private readonly BlockClass: BlockConstructable;

  private readonly query: string;

  constructor(pathname: string, BlockClass: BlockConstructable, query: string) {
    this.pathname = pathname;
    this.BlockClass = BlockClass;
    this.query = query;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return new RegExp(`^${this.pathname}/?$`).test(pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});

      render(this.query, this.block);
    }
  }
}

class Router {
  private static __instance?: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private notFoundRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public reset() {
    delete Router.__instance;

    new Router(this.rootQuery);
  }

  public useNotFoundRoute(block: BlockConstructable) {
    this.notFoundRoute = new Route('/404', block, this.rootQuery);
    return this;
  }

  public use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    let route: Route | null = this.getRoute(pathname);

    if (!route) {
      route = this.notFoundRoute;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    if (route) {
      route.render();
    }
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}

export default new Router('#app');
