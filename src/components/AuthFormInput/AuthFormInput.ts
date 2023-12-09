import Block from '../Block';
import template from './input.hbs';
import { Input } from '../Input/Input';

interface Props {
  label: string;
  name: string;
  type: string;
  onBlur?: (event: FocusEvent) => void;
}

export class AuthFormInput extends Block {
  constructor(props: Props) {
    super({
      label: props.label,
      Input: new Input(props),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
