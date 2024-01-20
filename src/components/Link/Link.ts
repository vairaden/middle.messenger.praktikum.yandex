import Block from '../Block.ts';
import template from './link.hbs';
import { BlockProps } from '../../types/index.ts';
import './link.pcss';
import { withRouter } from '../withRouter.ts';

interface Props extends BlockProps {
  Content: string;
  onClick?: EventListener;
  class?: string;
  href: string;
}

class Link extends Block<Props> {
  constructor(props: Props) {
    super({
      class: 'link_centered',
      events: {
        click: props.onClick || function () { props.router.go(props.href); },
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withRouter(Link);
