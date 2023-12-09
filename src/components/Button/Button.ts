import Block from '../Block';
import template from './button.hbs';

interface Props {
  text: string;
  class?: 'button_primary';
  type?: 'submit' | 'button';
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
