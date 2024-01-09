import template from './chatBrowser.hbs';
import Block from '../../components/Block';
import ChatItem from '../../components/ChatItem/ChatItem';
import Link from '../../components/Link/Link';
import {ChatInfo} from '../../api/ChatsApi/chatsApiTypes';
import Button from '../../components/Button/Button';
import chatsController from '../../controllers/ChatsController';
import {BlockProps} from '../../types';
import "./chatBrowser.pcss";
import Modal from "../Modal/Modal";
import CreateChatForm from "../CreateChatForm/CreateChatForm";
import ChatsController from "../../controllers/ChatsController";

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
      Modal: new Modal({
        Content: new CreateChatForm({
          onConfirm: async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            try {
              await ChatsController.createChat(values.chat_name);
              (this.children.Modal as Block).setProps({hidden: true});
            } catch (err) {
            }
          },
          onCancel: () => {
            (this.children.Modal as Block).setProps({hidden: true});
          }
        }),
        onCancel: () => {
          (this.children.Modal as Block).setProps({hidden: true});
        },
        confirmText: 'Создать',
        hidden: true,
      }),
      ChatItems: chatListFactory(props.chats),
      CreateButton: new Button({
        text: 'Создать чат',
        class: 'button_primary',
        onClick: () => {
          (this.children.Modal as Block).setProps({hidden: false});
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
  console.log(newProps.chats);
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
