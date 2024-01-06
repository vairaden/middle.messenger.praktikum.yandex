import template from './chatThread.hbs';
import Block from "../../components/Block";

export default class ChatThread extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
