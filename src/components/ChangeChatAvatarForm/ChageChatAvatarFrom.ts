import Block from '../Block.ts';
import template from './changeChatAvatarForm.hbs';
import { BlockProps } from '../../types/index.ts';
import Button from '../Button/Button.ts';
import FormInput from '../FormInput/FormInput.ts';

interface Props extends BlockProps {
  onSubmit: EventListener;
}

export default class ChageChatAvatarFrom extends Block<Props> {
  constructor(props: Props) {
    super({
      AvatarInput: new FormInput(
        {
          name: 'avatar',
          type: 'file',
          class: 'form__input',
          label: 'Аватар',
        },
      ),
      AddButton: new Button({
        Content: 'Изменить',
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
