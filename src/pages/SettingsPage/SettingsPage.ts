import template from './settingsPage.hbs';
import Block from '../../components/Block';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import {
  checkEmail, checkLogin, checkName, checkPassword, checkPhone,
} from '../../lib/validators';
import Link from '../../components/Link/Link';

interface InputAttrs {
  placeholder: string;
  type: string;
  name: string;
  errorText: string;
  validator: (value: string) => boolean;
}

const profileDataInputs: Record<string, InputAttrs> = {
  Почта: {
    placeholder: 'pochta@yandex.ru',
    type: 'email',
    name: 'email',
    validator: checkEmail,
    errorText: 'Может включать цифры и спецсимволы вроде дефиса и подчёркивания,'
      + ' обязательно должна быть «собака» (@) и точка после неё,'
      + ' но перед точкой обязательно должны быть буквы',

  },
  Логин: {
    placeholder: 'ivanivanov',
    type: 'text',
    name: 'login',
    validator: checkLogin,
    errorText: 'От 3 до 20 символов, латиница, может содержать цифры,'
      + ' но не состоять из них, без пробелов, без спецсимволов'
      + ' (допустимы дефис и нижнее подчёркивание)',
  },
  Имя: {
    placeholder: 'Иван',
    type: 'text',
    name: 'first_name',
    validator: checkName,
    errorText: 'Первая буква должна быть заглавной,'
      + ' без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  Фамилия: {
    placeholder: 'Иванов',
    type: 'text',
    name: 'second_name',
    validator: checkName,
    errorText: 'Первая буква должна быть заглавной,'
      + ' без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  'Имя в чате': {
    placeholder: 'Иван',
    type: 'text',
    name: 'display_name',
    validator: checkLogin,
    errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,'
      + ' без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  },
  Телефон: {
    placeholder: '+79099673030',
    type: 'tel',
    name: 'phone',
    validator: checkPhone,
    errorText: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  },
};
export default class SettingsPage extends Block {
  constructor() {
    super(
      {
        ProfileDataInputs: Object.entries(profileDataInputs).map(([label, attrs]) => new FormInput({
          name: attrs.name,
          type: attrs.type,
          label,
          placeholder: attrs.placeholder,
          errorText: attrs.errorText,
          class: 'form__input_flat',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!attrs.validator(value)) {
              this.setError(attrs.name, true);
            } else {
              this.setError(attrs.name, false);
            }
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
            errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
            class: 'form__input_flat',
            onBlur: (event) => {
              const { value } = (event.target as HTMLInputElement);

              if (!checkPassword(value)) {
                this.setError('newPassword', true);
              } else {
                this.setError('newPassword', false);
              }
            },
          }),
          new FormInput({
            name: 'oldPassword',
            type: 'password',
            label: 'Старый пароль',
            placeholder: '********',
            errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
            class: 'form__input_flat',
            onBlur: (event) => {
              const { value } = (event.target as HTMLInputElement);

              if (!checkPassword(value)) {
                this.setError('oldPassword', true);
              } else {
                this.setError('oldPassword', false);
              }
            },
          }),
        ],
        Link: new Link({
          class: 'back-button',
          Content: '<img src="/back.svg" alt="Стрелка назад"/>',
          onClick: () => {
            // render('profile');
          },
        }),
        Button: new Button({
          class: 'button_primary',
          type: 'submit',
          text: 'Сохранить',
        }),
        events: {
          submit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            this.resetFormErrors();
            let failedChecks = false;
            if (!checkEmail(values.email)) {
              this.setError('email', true);
              failedChecks = true;
            }
            if (!checkLogin(values.login)) {
              this.setError('login', true);
              failedChecks = true;
            }
            if (!checkName(values.first_name)) {
              this.setError('first_name', true);
              failedChecks = true;
            }
            if (!checkName(values.second_name)) {
              this.setError('second_name', true);
              failedChecks = true;
            }
            if (!checkName(values.display_name)) {
              this.setError('display_name', true);
              failedChecks = true;
            }
            if (!checkPhone(values.phone)) {
              this.setError('phone', true);
              failedChecks = true;
            }
            if (!checkPassword(values.newPassword)) {
              this.setError('newPassword', true);
              failedChecks = true;
            }
            if (!checkPassword(values.oldPassword)) {
              this.setError('oldPassword', true);
              failedChecks = true;
            }

            if (failedChecks) {
              return;
            }

            console.log(values);

            // render('profile');
          },
        },
      },
    );
  }

  setError(name: string, state: boolean) {
    switch (name) {
      case 'email':
        (this.children.ProfileDataInputs as Block[])[0].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'login':
        (this.children.ProfileDataInputs as Block[])[1].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'first_name':
        (this.children.ProfileDataInputs as Block[])[2].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'second_name':
        (this.children.ProfileDataInputs as Block[])[3].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'display_name':
        (this.children.ProfileDataInputs as Block[])[4].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'phone':
        (this.children.ProfileDataInputs as Block[])[5].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'newPassword':
        (this.children.PasswordInputs as Block[])[0].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'oldPassword':
        (this.children.PasswordInputs as Block[])[1].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      default:
        throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    (this.children.ProfileDataInputs as Block[]).forEach((child) => {
      child.setProps({ class: 'form__input_flat' });
    });
    (this.children.PasswordInputs as Block[]).forEach((child) => {
      child.setProps({ class: 'form__input_flat' });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
