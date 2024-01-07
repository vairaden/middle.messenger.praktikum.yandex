import template from './homePage.hbs';
import Block from '../../components/Block';
import ChatBrowser from '../../blocks/ChatBrowser/ChatBrowser';
import MessageControls from '../../blocks/MessageControls/MessageControls';
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes';
import ChatThread from '../../blocks/ChatThread/ChatThread';
import { Message } from '../../controllers/MessagesController';

interface Props {
  chats: ChatInfo[];
  selectedChat?: number;
  messages: Record<number, Message[]>;
}

class HomePage extends Block {
  constructor(props: Props) {
    const messages = props.selectedChat ? props.messages[props.selectedChat] : [];

    super({
      ChatBrowser: new ChatBrowser({ chats: props.chats }),
      ChatThread: new ChatThread({ messages }),
      MessageControls: new MessageControls({selectedChat: props.selectedChat}),
    });
  }

  init() {
    ChatsController.fetchChats();
  }

  protected componentDidUpdate(_: Props, newProps: Props): boolean {
    (this.children.ChatBrowser as ChatBrowser).setProps({ chats: newProps.chats });

    const messages = newProps.selectedChat ? newProps.messages[newProps.selectedChat] : [];
    (this.children.ChatThread as ChatThread).setProps({ messages });

    (this.children.MessageControls as MessageControls).setProps({ selectedChat: newProps.selectedChat });

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  messages: state.messages,
}));

export default withChats(HomePage);
