import Block from '../Block';
import template from './userList.hbs';
import { BlockProps } from '../../types';
import { User } from '../../api/AuthApi/authApiTypes';
import UserListItem from '../UserListItem/UserListItem';
import './userList.pcss';

interface Props extends BlockProps {
  users: Array<User & { role: string }>;
  chatId: number;
  currentUser: number;
}

export default class UserList extends Block<Props> {
  constructor(props: Props) {
    super({
      UserListItems: props.users.map((user) => new UserListItem({
        user,
        chatId: props.chatId,
        deletable: user.id !== props.currentUser,
      })),
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    this.children.UserListItems = newProps.users.map((user) => new UserListItem({
      user,
      chatId: newProps.chatId,
      deletable: user.id !== newProps.currentUser,
    }));
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
