import template from './homePage.hbs';
import Block from '../../components/Block';
import ChatBrowser from '../../blocks/ChatBrowser/ChatBrowser';
import MessageControls from '../../blocks/MessageControls/MessageControls';
import ChatsController from "../../controllers/ChatsController";
import {withStore} from "../../utils/Store";
import {ChatInfo} from "../../api/ChatsApi/chatsApiTypes";
import ChatThread from "../../blocks/ChatThread/ChatThread";

interface Props {
  chats: ChatInfo[];
  selectedChat?: number;
}

class HomePage extends Block {
  constructor(props: Props) {
    super({
      ChatBrowser: new ChatBrowser({chats: props.chats}),
      ChatThread: new ChatThread(),
      MessageControls: new MessageControls(),
    });
  }

  init() {
    ChatsController.fetchChats()
  }

  protected componentDidUpdate(_: Props, newProps: Props): boolean {
    (this.children.ChatBrowser as ChatBrowser).setProps({chats: newProps.chats});

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) =>
  ({chats: state.chats, selectedChat: state.selectedChat}));

export default withChats(HomePage);
