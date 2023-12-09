import template from './MessageControls.hbs';
import Block from "../../components/Block";
// import {render} from "../../lib/render";
// import {Button} from "../../components/Button/Button";

export default class MessageControls extends Block {
  constructor() {
    super({
      // Button: new Button({
      //   class: 'button_primary',
      //   events: {
      //     click: () => null,
      //   }, text: 'Авторизоваться'
      // })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
