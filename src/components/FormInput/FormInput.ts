import Block from '../Block';
import template from './formInput.hbs';
import Input from '../Input/Input';
import { BlockProps } from '../../types';
import './formInput.pcss';

interface Props extends BlockProps {
  label: string;
  name: string;
  type: string;
  class: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  accept?: string;
  value?: string;
  onBlur?: EventListener;
}

export default class FormInput extends Block<Props> {
  constructor(props: Props) {
    super({
      error: props.error,
      errorText: props.errorText,
      label: props.label,
      class: props.class,
      Input: new Input(
        {
          value: props.value,
          name: props.name,
          type: props.type,
          class: props.class,
          accept: props.accept,
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
