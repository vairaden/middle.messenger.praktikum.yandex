import template from './chatThreadDateSeparator.hbs';
import Block from '../Block';

export default class ChatThreadDateSeparator extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
