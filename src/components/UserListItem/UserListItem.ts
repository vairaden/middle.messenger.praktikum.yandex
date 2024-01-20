import Block from '../Block.ts';
import template from './userListItem.hbs';
import { BlockProps } from '../../types/index.ts';
import { User } from '../../api/AuthApi/authApiTypes.ts';
import Button from '../Button/Button.ts';
import ChatsController from '../../controllers/ChatsController.ts';
import './userListItem.pcss';

interface Props extends BlockProps{
  user: User & { role: string };
  deletable: boolean;
  chatId: number;
}

export default class UserListItem extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props.user,
      deletable: props.deletable,
      DeleteButton: new Button({
        Content: 'Удалить',
        class: 'button_primary',
        onClick: () => {
          ChatsController.deleteUserFromChat(props.chatId, props.user.id);
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
