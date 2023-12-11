import template from './message.hbs';
import Block from '../../components/Block';

export default class Message extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
