import template from './ChatItem.hbs';
import Block from '../../components/Block';

export default class ChatItem extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
