import template from './chatItem.hbs';
import Block from '../../components/Block';
import {ChatInfo} from "../../api/ChatsApi/chatsApiTypes";

interface Props {
  chat: ChatInfo;
  onClick: EventListener;
}

export default class ChatItem extends Block {
  constructor(props: Props) {
    super({
      events: {
        click: props.onClick,
      },
      ...props.chat
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
