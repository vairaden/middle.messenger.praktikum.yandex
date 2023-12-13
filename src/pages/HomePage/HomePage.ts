import template from './homePage.hbs';
import Block from '../../components/Block';
import ChatBrowser from '../../blocks/ChatBrowser/ChatBrowser';
import Message from '../../blocks/Message/Message';
import MessageControls from '../../blocks/MessageControls/MessageControls';

export default class HomePage extends Block {
  constructor() {
    super({
      ChatBrowser: new ChatBrowser(),
      Message: new Message(),
      MessageControls: new MessageControls(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
