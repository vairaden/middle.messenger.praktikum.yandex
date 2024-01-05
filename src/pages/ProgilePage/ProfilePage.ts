import template from './profilePage.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import AuthController from "../../controllers/AuthController";

const profileInformation = {
  Почта: 'pochta@yandex.ru',
  Логин: 'ivanivanov',
  Имя: 'Иван',
  Фамилия: 'Иванов',
  'Имя в чате': 'Иван',
  Телефон: '+7 (909) 967 30 30',
};
export default class ProfilePage extends Block {
  constructor() {
    super({
      Link: new Link({
        class: 'back-button',
        Content: '<img src="/back.svg" alt="Стрелка назад"/>',
        href: '/messenger',
      }),
      ProfileItems: Object.entries(profileInformation).map(([key, value]) => new ProfileItem({
        label: key,
        value,
      })),
      SettingsLink: new Link({
        Content: 'Изменить данные',
        class: 'link',
        href: 'settings',
      }),
      ChangePasswordLink: new Link({
        Content: 'Изменить пароль',
        class: 'link',
        href: '/settings',
      }),
      ExitLink: new Link({
        Content: 'Выйти',
        class: 'link_alert',
        href: '#',
        onClick: () => {
          AuthController.logout();
        }
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
