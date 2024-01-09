import template from './chatThread.hbs';
import Block from '../../components/Block';
import MessageBlock from '../../components/Message/Message';
import { Message } from '../../controllers/MessagesController';
import getReadableTime from '../../lib/getReadableTime';
import { BlockProps } from '../../types';
import './chatThread.pcss';
import {User} from "../../api/AuthApi/authApiTypes";

interface Props extends BlockProps {
  messages: Message[];
  user: User;
}

export default class ChatThread extends Block<Props> {
  constructor(props: Props) {
    super({
      Messages: props.messages.map((message) => {
        return new MessageBlock({
          modifier: props.user.id === message.user_id ? 'sent' : 'received',
          text: message.content,
          time: getReadableTime(message.time),
        });
      }),
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    (this.children.Messages as unknown as MessageBlock[]) = newProps.messages.map((message) => {
      return new MessageBlock({
        modifier: this.props.user.id === message.user_id ? 'sent' : 'received',
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
