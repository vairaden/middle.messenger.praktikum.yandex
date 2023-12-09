import template from './main.hbs';
import Block from "../../components/Block";
import ChatBrowser from "../../widgets/ChatBrowser/ChatBrowser";
import Message from "../../widgets/Message/Message";
import MessageControls from "../../widgets/MessageControls/MessageControls";
// import {render} from "../../lib/render";
// import {Button} from "../../components/Button/Button";

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
