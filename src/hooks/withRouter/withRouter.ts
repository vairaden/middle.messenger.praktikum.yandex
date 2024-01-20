import { BlockProps } from '../../types/index.ts';
import Block from '../../components/Block/Block.ts';
import Router from '../../utils/Router/Router.ts';

export function withRouter<P extends BlockProps>(Component: typeof Block<P>) {
  type Pr = typeof Component extends typeof Block<infer P extends BlockProps> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Pr & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router?: typeof Router;
}
