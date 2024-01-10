import Block from '../Block';
import template from './link.hbs';
import { BlockProps } from '../../types';
import './link.pcss';

interface Props extends BlockProps {
  Content: string;
  onClick?: EventListener;
  class?: string;
  href: string;
}

export default class Link extends Block<Props> {
  constructor(props: Props) {
    super({
      class: 'link_centered',
      events: {
        click: props.onClick,
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
