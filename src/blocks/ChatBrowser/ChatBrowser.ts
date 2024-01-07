import template from './chatBrowser.hbs';
import Block from '../../components/Block';
import ChatItem from '../../components/ChatItem/ChatItem';
import Link from '../../components/Link/Link';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes';
import Button from '../../components/Button/Button';
import ChatsController from '../../controllers/ChatsController';
import chatsController from '../../controllers/ChatsController';
import { BlockProps } from '../../types';

function chatListFactory(chats?: ChatInfo[]) {
  if (chats) {
    return chats.map((chat) => new ChatItem({
      chat,
      onClick: () => {
        chatsController.selectChat(chat.id);
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
      ChatItems: chatListFactory(props.chats),
      CreateButton: new Button({
        text: 'Создать чат',
        class: 'button_primary',
        onClick: () => {
          ChatsController.createChat('kek');
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
