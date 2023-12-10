import Block from '../Block';
import template from './input.hbs';
import { Input } from '../Input/Input';

interface Props {
  label: string;
  name: string;
  type: string;
  class: string;
  error?: boolean;
  placeholder?: string;
  onBlur?: (event: FocusEvent) => void;
}

export class FormInput extends Block {
  constructor(props: Props) {
    super({
      error: props.error,
      label: props.label,
      class: props.class,
      Input: new Input(props),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
