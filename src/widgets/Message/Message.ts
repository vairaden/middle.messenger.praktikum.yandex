import template from './Message.hbs';
import Block from '../../components/Block';

export default class Message extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
