import template from './settingsForm.hbs';
import Block from '../../components/Block';
import { BlockProps } from '../../types';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import './settingsForm.pcss';

interface Props extends BlockProps {
  headerText?: string;
  submitButtonText: string;
  Inputs: FormInput[];
  onSubmit: EventListener;
}

export default class SettingForm extends Block<Props> {
  constructor(props: Props) {
    super({
      headerText: props.headerText,
      Inputs: props.Inputs,
      SubmitButton: new Button({
        class: 'button_primary',
        type: 'submit',
        text: props.submitButtonText,
      }),
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
