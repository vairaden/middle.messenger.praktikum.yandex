import template from './chatThread.hbs';
import Block from '../../components/Block';
import MessageBlock from '../../components/Message/Message';
import { Message } from '../../controllers/MessagesController';
import getReadableTime from '../../lib/getReadableTime';
import { BlockProps } from '../../types';
import './chatThread.pcss';
import { User } from '../../api/AuthApi/authApiTypes';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes';
import Modal from '../Modal/Modal';
import ChatsController from '../../controllers/ChatsController';
import Button from '../../components/Button/Button';
import ChatSettings from '../ChatSettings/ChatSettings';

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
          onConfirm: async (e: Event) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            await ChatsController.createChat(values.chat_name);
            (this.children.Modal as Block).setProps({ hidden: true });
          },
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

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
