import Block from '../Block';
import template from './link.hbs';

interface Props {
  onClick?: () => void;
}

export class Link extends Block {
  constructor(props: Props) {
    super({
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
