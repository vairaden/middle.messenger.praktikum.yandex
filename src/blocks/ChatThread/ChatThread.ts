import template from './chatThread.hbs';
import Block from '../../components/Block';
import MessageBlock from '../../components/Message/Message';
import { Message } from '../../controllers/MessagesController';

interface Props {
  messages: Message[];
}

export default class ChatThread extends Block {
  constructor(props: Props) {
    super({
      Messages: props.messages.map((message) => {
        return new MessageBlock({
          text: message.content,
          time: message.time,
        });
      }),
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.log(newProps);
    (this.children.Messages as MessageBlock[]) = newProps.messages.map((message) => {
      return new MessageBlock({
        text: message.content,
        time: new Date(message.time).getHours().toString(),
      });
    });

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
