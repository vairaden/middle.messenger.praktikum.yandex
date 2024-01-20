import template from './messageControls.hbs';
import Block from '../../components/Block.ts';
import Input from '../../components/Input/Input.ts';
import { checkNotEmpty } from '../../lib/validators.ts';
import MessagesController from '../../controllers/MessagesController.ts';
import { BlockProps } from '../../types/index.ts';
import './messageControls.pcss';

interface Props extends BlockProps {
  selectedChat?: number;
}
export default class MessageControls extends Block<Props> {
  constructor() {
    super({
      Input: new Input({
        id: 'message',
        name: 'message',
        type: 'text',
        class: 'message-controls__input',
        placeholder: 'Сообщение',
      }),
      events: {
        submit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          if (checkNotEmpty(values.message) && this.props.selectedChat) {
            MessagesController.sendMessage(this.props.selectedChat, values.message);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
