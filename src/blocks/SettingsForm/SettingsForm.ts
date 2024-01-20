import template from './settingsForm.hbs';
import Block from '../../components/Block/Block.ts';
import { BlockProps } from '../../types/index.ts';
import Button from '../../components/Button/Button.ts';
import FormInput from '../../components/FormInput/FormInput.ts';
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
        Content: props.submitButtonText,
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
