import Block from '../Block/Block.ts';
import template from './addUserForm.hbs';
import { BlockProps } from '../../types/index.ts';
import Button from '../Button/Button.ts';
import FormInput from '../FormInput/FormInput.ts';

interface Props extends BlockProps {
  onSubmit: EventListener;
}

export default class AddUserForm extends Block<Props> {
  constructor(props: Props) {
    super({
      NameInput: new FormInput(
        {
          name: 'user_id',
          type: 'text',
          class: 'form__input',
          label: 'id пользователя',
        },
      ),
      AddButton: new Button({
        Content: 'Добавить',
        type: 'submit',
        class: 'button_primary',
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
