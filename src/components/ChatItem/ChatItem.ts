import template from './chatItem.hbs';
import Block from '../../components/Block';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes';
import { BlockProps } from '../../types';
import './chatItem.pcss';

interface Props extends BlockProps {
  chat: ChatInfo;
  onClick: EventListener;
}

export default class ChatItem extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props.chat,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
