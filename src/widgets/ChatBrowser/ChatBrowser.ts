import template from './ChatBrowser.hbs';
import Block from '../../components/Block';
import ChatItem from '../../components/ChatItem/ChatItem';

export default class ChatBrowser extends Block {
  constructor() {
    super({
      ChatItems: new Array(3).fill(null).map(() => new ChatItem()),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
