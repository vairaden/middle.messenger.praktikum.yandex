import Block from '../Block.ts';
import template from './button.hbs';
import { BlockProps } from '../../types/index.ts';
import './button.pcss';

interface Props extends BlockProps {
  Content: string;
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
