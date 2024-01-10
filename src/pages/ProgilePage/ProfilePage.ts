import template from './profilePage.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import AuthController from '../../controllers/AuthController';
import { User } from '../../api/AuthApi/authApiTypes';
import { withStore } from '../../utils/Store';
import { BlockProps } from '../../types';
import './profilePage.pcss';

const profileInformation = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Логин',
  email: 'Почта',
  phone: 'Телефон',
};

interface Props extends BlockProps{
  user: User;
}

class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    super({
      Link: new Link({
        class: 'back-button',
        Content: '<img src="/back.svg" alt="Стрелка назад"/>',
        href: '/messenger',
      }),
      ProfileItems: Object.entries(profileInformation).map(([key, value]) => new ProfileItem({
        label: value,
        value: props.user[key as keyof User],
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
