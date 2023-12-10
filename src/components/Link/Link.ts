import Block from '../Block';
import template from './link.hbs';

interface Props {
  Content: string;
  onClick?: () => void;
  class?: string;
}

export class Link extends Block {
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
