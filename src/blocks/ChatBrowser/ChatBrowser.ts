import template from './chatBrowser.hbs';
import Block from '../../components/Block';
import ChatItem from '../../components/ChatItem/ChatItem';
import Link from '../../components/Link/Link';

export default class ChatBrowser extends Block {
  constructor() {
    super({
      ChatItems: new Array(3).fill(null).map(() => new ChatItem()),
      Link: new Link({
        Content: 'Профиль',
        href: 'settings',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
