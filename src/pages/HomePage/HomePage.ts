import template from './main.hbs';
import Block from '../../components/Block';
import ChatBrowser from '../../widgets/ChatBrowser/ChatBrowser';
import Message from '../../widgets/Message/Message';
import MessageControls from '../../widgets/MessageControls/MessageControls';

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
