import Block from '../Block';
import template from './link.hbs';
import { BlockProps } from '../../types';
import './link.pcss';
import { withRouter } from '../withRouter';

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
