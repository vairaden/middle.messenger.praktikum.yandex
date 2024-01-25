import template from './homePage.hbs';
import Block from '../../components/Block/Block.ts';
import ChatBrowser from '../../blocks/ChatBrowser/ChatBrowser.ts';
import MessageControls from '../../blocks/MessageControls/MessageControls.ts';
import ChatsController from '../../controllers/ChatsController.ts';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes.ts';
import ChatThread from '../../blocks/ChatThread/ChatThread.ts';
import { Message } from '../../controllers/MessagesController.ts';
import { BlockProps } from '../../types/index.ts';
import './homePage.pcss';
import { User } from '../../api/AuthApi/authApiTypes.ts';
import withStore from '../../hooks/withStore/withStore.ts';

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
      ChatThread: new ChatThread({
        messages,
        user: props.user,
        selectedChat: props.chats?.find((chat) => chat.id === props.selectedChat),
      }),
      MessageControls: new MessageControls(),
    });
  }

  init() {
    ChatsController.fetchChats();
  }

  protected componentDidUpdate(_: Props, newProps: Props): boolean {
    (this.children.ChatBrowser as unknown as ChatBrowser).setProps({ chats: newProps.chats });

    const messages = newProps.selectedChat ? newProps.messages[newProps.selectedChat] : [];
    (this.children.ChatThread as unknown as ChatThread).setProps({
      messages,
      user: newProps.user,
      selectedChat: newProps.chats?.find((chat) => chat.id === newProps.selectedChat),
    });

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
