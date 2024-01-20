import Block from '../Block.ts';
import template from './input.hbs';
import { BlockProps } from '../../types/index.ts';

interface Props extends BlockProps {
  id?: string;
  name: string;
  type: string;
  class?: string;
  placeholder?: string;
  value?: string;
  accept?: string;
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
