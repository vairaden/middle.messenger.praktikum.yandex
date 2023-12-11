import template from './profilePage.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';
import render from '../../lib/render';
import ProfileItem from '../../components/ProfileItem/ProfileItem';

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
        onClick: () => {
          render('home');
        },
      }),
      ProfileItems: Object.entries(profileInformation).map(([key, value]) => new ProfileItem({
        label: key,
        value,
      })),
      SettingsLink: new Link({
        Content: 'Изменить данные',
        class: 'link',
        onClick: () => {
          render('settings');
        },
      }),
      ChangePasswordLink: new Link({
        Content: 'Изменить пароль',
        class: 'link',
        onClick: () => {
          render('settings');
        },
      }),
      ExitLink: new Link({
        Content: 'Выйти',
        class: 'link_alert',
        onClick: () => {
          render('login');
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
