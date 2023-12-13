import Block from '../Block';
import template from './link.hbs';

interface Props {
  Content: string;
  onClick?: EventListener;
  class?: string;
}

export default class Link extends Block {
  constructor(props: Props) {
    super({
      class: 'link_centered',
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
