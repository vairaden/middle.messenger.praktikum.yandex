import template from './ChatBrowser.hbs';
import Block from '../../components/Block';
import ChatItem from '../../components/ChatItem/ChatItem';
import Link from '../../components/Link/Link';
import render from '../../lib/render';

export default class ChatBrowser extends Block {
  constructor() {
    super({
      ChatItems: new Array(3).fill(null).map(() => new ChatItem()),
      Link: new Link({
        Content: 'Профиль',
        onClick: () => {
          render('profile');
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
