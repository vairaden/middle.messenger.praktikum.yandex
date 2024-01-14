import Block from '../../components/Block';
import template from './chatSettings.hbs';
import { BlockProps } from '../../types';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../utils/Store';
import './chatSettings.pcss';
import UserList from '../../components/UserList/UserList';
import { User } from '../../api/AuthApi/authApiTypes';
import AddUserForm from '../../components/AddUserForm/AddUserForm';

interface Props extends BlockProps {
  onCancel: () => void;
  onConfirm: EventListener;
  selectedChat?: number;
  user: User;
}

class ChatSettings extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        onConfirm: props.onConfirm,
        hidden: props.hidden,
        AddUserForm: new AddUserForm({
          onSubmit: (e) => {
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            ChatsController.addUserToChat(this.props.selectedChat!, values.user_id);
          },
        }),
        CloseButton: new Button({
          Content: 'Закрыть',
          onClick: props.onCancel,
          type: 'button',
          class: 'button_secondary',
        }),
        UserList: new UserList({
          users: [],
          currentUser: props.user.id,
          chatId: props.selectedChat!,
        }),
        DeleteChatButton: new Link({
          onClick: () => {
            if (!this.props.selectedChat) {
              return;
            }
            ChatsController.deleteChat(this.props.selectedChat).then(() => {
              props.onCancel();
            });
          },
          href: '#',
          Content: 'Удалить чат',
          class: 'link_alert',
        }),
        events: {
          submit: props.onConfirm,
        },
      },
    );
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (newProps.selectedChat) {
      ChatsController.getChatUsers(newProps.selectedChat).then((users) => {
        (this.children.UserList as Block).setProps({
          users,
          currentUser: newProps.user.id,
          chatId: newProps.selectedChat,
        });
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user, selectedChat: state.selectedChat }));
export default withUser(ChatSettings);
