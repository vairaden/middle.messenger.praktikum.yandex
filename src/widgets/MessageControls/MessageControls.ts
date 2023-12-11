import template from './messageControls.hbs';
import Block from '../../components/Block';
import Input from '../../components/Input/Input';
import { checkNotEmpty } from '../../lib/validators';

export default class MessageControls extends Block {
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
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          if (!checkNotEmpty(values.message)) {
            console.log('Empty message');
            return;
          }

          console.log(values);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
