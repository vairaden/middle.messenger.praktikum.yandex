import template from './chatThread.hbs';
import Block from '../../components/Block.ts';
import MessageBlock from '../../components/Message/Message.ts';
import { Message } from '../../controllers/MessagesController.ts';
import getReadableTime from '../../lib/getReadableTime.ts';
import { BlockProps } from '../../types/index.ts';
import './chatThread.pcss';
import { User } from '../../api/AuthApi/authApiTypes.ts';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes.ts';
import Modal from '../Modal/Modal.ts';
import Button from '../../components/Button/Button.ts';
import ChatSettings from '../ChatSettings/ChatSettings.ts';

interface Props extends BlockProps {
  selectedChat?: ChatInfo;
  messages: Message[];
  user: User;
}

export default class ChatThread extends Block<Props> {
  constructor(props: Props) {
    super({
      Modal: new Modal({
        Content: new ChatSettings({
          selectedChat: props.selectedChat,
          onCancel: () => {
            (this.children.Modal as Block).setProps({ hidden: true });
          },
        }),
        onCancel: () => {
          (this.children.Modal as Block).setProps({ hidden: true });
        },
        confirmText: 'Создать',
        hidden: true,
      }),
      EtcButton: new Button({
        type: 'button',
        Content: '<img src="/etc.svg" alt="Еще"/>',
        class: 'chat-thread__etc-button',
        onClick: () => {
          (this.children.Modal as Block).setProps({ hidden: false });
        },
      }),
      selectedChat: props.selectedChat,
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
        modifier: newProps.user.id === message.user_id ? 'sent' : 'received',
        text: message.content,
        time: getReadableTime(message.time),
      });
    });

    const element = document.getElementById('message-thread');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
