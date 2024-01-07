import Block from '../Block';
import template from './button.hbs';
import { BlockProps } from '../../types';

interface Props extends BlockProps {
  text: string;
  class?: string;
  type?: 'submit' | 'button';
  onClick?: EventListener;
}

export default class Button extends Block<Props> {
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
