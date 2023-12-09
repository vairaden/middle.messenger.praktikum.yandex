import Block from '../Block';
import template from './input.hbs';

interface Props {
  name: string;
  type: string;
  onBlur?: (event: FocusEvent) => void;
}

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        blur: props.onBlur
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
