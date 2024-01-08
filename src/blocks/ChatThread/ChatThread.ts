import template from './chatThread.hbs';
import Block from '../../components/Block';
import MessageBlock from '../../components/Message/Message';
import { Message } from '../../controllers/MessagesController';
import getReadableTime from '../../lib/getReadableTime';
import { BlockProps } from '../../types';

interface Props extends BlockProps {
  messages: Message[];
}

export default class ChatThread extends Block<Props> {
  constructor(props: Props) {
    super({
      Messages: props.messages.map((message) => {
        return new MessageBlock({
          text: message.content,
          time: getReadableTime(message.time),
        });
      }),
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    (this.children.Messages as unknown as MessageBlock[]) = newProps.messages.map((message) => {
      return new MessageBlock({
        text: message.content,
        time: getReadableTime(message.time),
      });
    });

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
