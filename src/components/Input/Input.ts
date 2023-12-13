import Block from '../Block';
import template from './input.hbs';

interface Props {
  id?: string;
  name: string;
  type: string;
  class?: string;
  placeholder?: string;
  onBlur?: EventListener;
}

export default class Input extends Block {
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
