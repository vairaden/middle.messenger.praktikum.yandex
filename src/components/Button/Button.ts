import Block from '../Block';
import template from './button.hbs';
import { BlockProps } from '../../types';
import './button.pcss';

interface Props extends BlockProps {
  text: string;
  class?: string;
  type?: 'submit' | 'button' | 'reset';
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
