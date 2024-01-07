import template from './messageControls.hbs';
import Block from '../../components/Block';
import Input from '../../components/Input/Input';
import { checkNotEmpty } from '../../lib/validators';
import MessagesController from "../../controllers/MessagesController";

interface Props {
  selectedChat?: number;
}
export default class MessageControls extends Block {
  constructor(props: Props) {
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
            MessagesController.sendMessage(this.props.selectedChat, values.message)
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
