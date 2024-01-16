import Block from '../../components/Block';
import template from './createChatForm.hbs';
import './createChatForm.pcss';
import { BlockProps } from '../../types';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';

interface Props extends BlockProps {
  onCancel: () => void;
  onConfirm: EventListener;
}

export default class CreateChatForm extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        onConfirm: props.onConfirm,
        hidden: props.hidden,
        NameInput: new FormInput(
          {
            name: 'chat_name',
            type: 'text',
            class: 'form__input',
            label: 'Имя чата',
          },
        ),
        CancelButton: new Button({
          Content: 'Отменить',
          onClick: props.onCancel,
          type: 'reset',
          class: 'button_secondary',
        }),
        ConfirmButton: new Button({
          Content: 'Создать',
          type: 'submit',
          class: 'button_primary',
        }),
        events: {
          submit: props.onConfirm,
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
