import template from './profilePage.hbs';
import Block from '../../components/Block/Block.ts';
import Link from '../../components/Link/Link.ts';
import ProfileItem from '../../components/ProfileItem/ProfileItem.ts';
import AuthController from '../../controllers/AuthController/AuthController.ts';
import { User } from '../../api/AuthApi/authApiTypes.ts';
import { BlockProps } from '../../types/index.ts';
import './profilePage.pcss';
import withStore from '../../hooks/withStore/withStore.ts';

const profileInformation = {
  id: 'ID',
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Логин',
  display_name: 'Имя в чате',
  email: 'Почта',
  phone: 'Телефон',
};

interface Props extends BlockProps{
  user: User;
}

class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    super({
      avatar: props.user?.avatar,
      userLogin: props.user?.login,
      Link: new Link({
        class: 'back-button',
        Content: '<img src="/back.svg" alt="Стрелка назад"/>',
        href: '/messenger',
      }),
      ProfileItems: Object.entries(profileInformation).map(([key, value]) => new ProfileItem({
        label: value,
        value: props.user && props.user[key as keyof User] ? props.user[key as keyof User].toString() : '-',
      })),
      SettingsLink: new Link({
        Content: 'Изменить данные',
        class: 'link',
        href: '/settings',
      }),
      ExitLink: new Link({
        Content: 'Выйти',
        class: 'link_alert',
        href: '#',
        onClick: () => {
          AuthController.logout();
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userStore = withStore((state) => ({ user: state.user }));
export default userStore(ProfilePage);
