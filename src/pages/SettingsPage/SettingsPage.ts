import template from './settings.hbs';
import Block from '../../components/Block';
import { render } from '../../lib/render';
import { Button } from '../../components/Button/Button';
import { FormInput } from '../../components/FormInput/FormInput';

const profileDataInputs = {
  Почта: { placeholder: 'pochta@yandex.ru', type: 'email', name: 'email' },
  Логин: { placeholder: 'ivanivanov', type: 'text', name: 'login' },
  Имя: { placeholder: 'Иван', type: 'text', name: 'first_name' },
  Фамилия: { placeholder: 'Иванов', type: 'text', name: 'second_name' },
  'Имя в чате': { placeholder: 'Иван', type: 'text', name: 'display_name' },
  Телефон: { placeholder: '+7 (909) 967 30 30', type: 'tel', name: 'phone' },
};
export default class SettingsPage extends Block {
  constructor() {
    super(
      {
        ProfileDataInputs: Object.entries(profileDataInputs).map(([key, value]) => new FormInput({
          name: value.name,
          type: value.type,
          label: key,
          placeholder: value.placeholder,
          class: 'form__input_flat',
          onBlur: (event: FocusEvent) => {
            const { value } = (event.target as HTMLInputElement);
            console.log(value);
            // if (!checkPassword(value)) {
            //   this.setError('password', true);
            // } else {
            //   this.setError('password', false);
            // }
          },
        })),
        AvatarInput: new FormInput({
          name: 'avatar',
          type: 'file',
          label: 'Аватар',
          class: 'form__input_flat',
        }),
        PasswordInputs: [
          new FormInput({
            name: 'newPassword',
            type: 'password',
            label: 'Новый пароль',
            placeholder: '********',
            class: 'form__input_flat',
          }),
          new FormInput({
            name: 'oldPassword',
            type: 'password',
            label: 'Старый пароль',
            placeholder: '********',
            class: 'form__input_flat',
          }),
        ],
        Button: new Button({
          class: 'button_primary',
          type: 'submit',
          text: 'Сохранить',
        }),
        events: {
          submit: (event: SubmitEvent) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);
            //
            // if (!checkLogin(values.login)) {
            //   return;
            // }
            // if (!checkPassword(values.password)) {
            //   return;
            // }

            console.log(values);

            render('profile');
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
