import template from './chatBrowser.hbs';
import Block from '../../components/Block/Block.ts';
import ChatItem from '../../components/ChatItem/ChatItem.ts';
import Link from '../../components/Link/Link.ts';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes.ts';
import Button from '../../components/Button/Button.ts';
import { BlockProps } from '../../types/index.ts';
import './chatBrowser.pcss';
import Modal from '../Modal/Modal.ts';
import CreateChatForm from '../CreateChatForm/CreateChatForm.ts';
import ChatsController from '../../controllers/ChatsController.ts';

function chatListFactory(chats?: ChatInfo[]) {
  if (chats) {
    return chats.map((chat) => new ChatItem({
      chat,
      onClick: () => {
        ChatsController.selectChat(chat.id);
      },
    }));
  }
  return [];
}

interface Props extends BlockProps {
  chats?: ChatInfo[];
}

export default class ChatBrowser extends Block<Props> {
  constructor(props: Props) {
    super({
      Modal: new Modal({
        Content: new CreateChatForm({
          onConfirm: async (e) => {
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
      ChatItems: chatListFactory(props.chats),
      CreateButton: new Button({
        Content: 'Создать чат',
        class: 'button_primary',
        onClick: () => {
          (this.children.Modal as Block).setProps({ hidden: false });
        },
      }),
      Link: new Link({
        Content: 'Профиль',
        href: '/profile',
      }),
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    (this.children.ChatItems as unknown as ChatItem[]) = chatListFactory(newProps.chats);
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
