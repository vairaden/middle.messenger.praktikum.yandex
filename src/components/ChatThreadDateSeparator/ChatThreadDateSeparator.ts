import template from './chatThreadDateSeparator.hbs';
import Block from '../Block/Block.ts';

export default class ChatThreadDateSeparator extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
