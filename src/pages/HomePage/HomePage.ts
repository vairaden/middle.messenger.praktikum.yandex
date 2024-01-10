import template from './homePage.hbs';
import Block from '../../components/Block';
import ChatBrowser from '../../blocks/ChatBrowser/ChatBrowser';
import MessageControls from '../../blocks/MessageControls/MessageControls';
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes';
import ChatThread from '../../blocks/ChatThread/ChatThread';
import { Message } from '../../controllers/MessagesController';
import { BlockProps } from '../../types';
import './homePage.pcss';
import { User } from '../../api/AuthApi/authApiTypes';

interface Props extends BlockProps {
  chats: ChatInfo[];
  selectedChat?: number;
  messages: Record<number, Message[]>;
  user: User;
}

class HomePage extends Block<Props> {
  constructor(props: Props) {
    const messages = props.selectedChat ? props.messages[props.selectedChat] : [];

    super({
      ChatBrowser: new ChatBrowser({ chats: props.chats }),
      ChatThread: new ChatThread({ messages, user: props.user }),
      MessageControls: new MessageControls(),
    });
  }

  init() {
    ChatsController.fetchChats();
  }

  protected componentDidUpdate(_: Props, newProps: Props): boolean {
    (this.children.ChatBrowser as unknown as ChatBrowser).setProps({ chats: newProps.chats });

    const messages = newProps.selectedChat ? newProps.messages[newProps.selectedChat] : [];
    (this.children.ChatThread as unknown as ChatThread).setProps({ messages, user: newProps.user });

    (this.children.MessageControls as unknown as MessageControls).setProps({ selectedChat: newProps.selectedChat });

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  user: state.user,
  messages: state.messages,
}));

export default withChats(HomePage);
