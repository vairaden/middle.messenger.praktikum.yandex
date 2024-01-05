import Router from '../utils/Router';
import Block from './Block';
import { BlockProps } from '../types';

export function withRouter(Component: typeof Block) {
  type Pr = typeof Component extends typeof Block<infer P extends BlockProps> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Pr & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}