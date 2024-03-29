import Block from '../../components/Block/Block.ts';
import template from './chatSettings.hbs';
import { BlockProps } from '../../types/index.ts';
import Button from '../../components/Button/Button.ts';
import Link from '../../components/Link/Link.ts';
import ChatsController from '../../controllers/ChatsController.ts';
import './chatSettings.pcss';
import UserList from '../../components/UserList/UserList.ts';
import { User } from '../../api/AuthApi/authApiTypes.ts';
import AddUserForm from '../../components/AddUserForm/AddUserForm.ts';
import ChageChatAvatarFrom from '../../components/ChangeChatAvatarForm/ChageChatAvatarFrom.ts';
import withStore from '../../hooks/withStore/withStore.ts';

interface Props extends BlockProps {
  onCancel: () => void;
  selectedChat?: number;
  user: User;
}

class ChatSettings extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        hidden: props.hidden,
        AddUserForm: new AddUserForm({
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            ChatsController.addUserToChat(this.props.selectedChat!, values.user_id);
          },
        }),
        UserList: new UserList({
          users: [],
          currentUser: props.user?.id,
          chatId: props.selectedChat!,
        }),
        ChangeAvatarForm: new ChageChatAvatarFrom({
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            if (this.props.selectedChat) {
              formData.append('chatId', this.props.selectedChat.toString());

              ChatsController.changeChatAvatar(formData);
            }
          },
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
        CloseButton: new Button({
          Content: 'Закрыть',
          onClick: props.onCancel,
          type: 'button',
          class: 'button_secondary',
        }),
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
