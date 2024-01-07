import Block from '../Block';
import template from './input.hbs';
import { BlockProps } from '../../types';

interface Props extends BlockProps {
  id?: string;
  name: string;
  type: string;
  class?: string;
  placeholder?: string;
  onBlur?: EventListener;
}

export default class Input extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
