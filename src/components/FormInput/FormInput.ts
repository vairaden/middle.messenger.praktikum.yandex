import Block from '../Block';
import template from './formInput.hbs';
import Input from '../Input/Input';

interface Props {
  label: string;
  name: string;
  type: string;
  class: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  onBlur?: EventListener;
}

export default class FormInput extends Block {
  constructor(props: Props) {
    super({
      error: props.error,
      errorText: props.errorText,
      label: props.label,
      class: props.class,
      Input: new Input(
        {
          name: props.name,
          type: props.type,
          class: props.class,
          placeholder: props.placeholder,
          onBlur: props.onBlur,
        },
      ),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
