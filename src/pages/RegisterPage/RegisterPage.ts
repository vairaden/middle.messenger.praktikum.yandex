import template from './registerPage.hbs';
import Block from '../../components/Block';
import FormInput from '../../components/FormInput/FormInput';
import {
  checkEmail, checkLogin, checkName, checkPassword, checkPhone,
} from '../../lib/validators';
import Link from '../../components/Link/Link';
import Button from '../../components/Button/Button';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthApi/authApiTypes';

export default class RegisterPage extends Block {
  constructor() {
    super({
      Link: new Link({
        Content: 'Войти',
        href: '/',
      }),
      Button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        class: 'button_primary',
      }),
      Inputs: [
        new FormInput({
          label: 'Почта',
          type: 'email',
          name: 'email',
          errorText: 'Может включать цифры и спецсимволы вроде дефиса и подчёркивания,'
            + ' обязательно должна быть «собака» (@) и точка после неё,'
            + ' но перед точкой обязательно должны быть буквы',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkEmail(value)) {
              this.setError('email', true);
            } else {
              this.setError('email', false);
            }
          },
        }), new FormInput({
          label: 'Логин',
          type: 'text',
          name: 'login',
          errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,'
            + ' без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
              this.setError('login', true);
            } else {
              this.setError('login', false);
            }
          },
        }), new FormInput({
          label: 'Имя',
          type: 'text',
          name: 'first_name',
          errorText: 'Первая буква должна быть заглавной, без пробелов и без цифр,'
            + ' нет спецсимволов (допустим только дефис)',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkName(value)) {
              this.setError('first_name', true);
            } else {
              this.setError('first_name', false);
            }
          },
        }), new FormInput({
          label: 'Фамилия',
          type: 'text',
          name: 'second_name',
          errorText: 'Первая буква должна быть заглавной, без пробелов и без цифр,'
            + ' нет спецсимволов (допустим только дефис)',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkName(value)) {
              this.setError('second_name', true);
            } else {
              this.setError('second_name', false);
            }
          },
        }), new FormInput({
          label: 'Телефон',
          type: 'tel',
          name: 'phone',
          errorText: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkPhone(value)) {
              this.setError('phone', true);
            } else {
              this.setError('phone', false);
            }
          },
        }), new FormInput({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkPassword(value)) {
              this.setError('password', true);
            } else {
              this.setError('password', false);
            }
          },
        }), new FormInput({
          label: 'Пароль (ещё раз)',
          type: 'password',
          name: 'password_repeat',
          errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          class: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!checkPassword(value)) {
              this.setError('password_repeat', true);
            } else {
              this.setError('password_repeat', false);
            }
          },
        }),
      ],
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
          if (!checkPhone(values.phone)) {
            this.setError('phone', true);
            failedChecks = true;
          }
          if (!checkPassword(values.password)) {
            this.setError('password', true);
            failedChecks = true;
          }
          if (!checkPassword(values.password_repeat)) {
            this.setError('password_repeat', true);
            failedChecks = true;
          }

          if (failedChecks) {
            return;
          }

          AuthController.signup(values as SignupData);
        },
      },
    });
  }

  setError(name: string, state: boolean) {
    switch (name) {
      case 'email':
        (this.children.Inputs as Block[])[0].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'login':
        (this.children.Inputs as Block[])[1].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'first_name':
        (this.children.Inputs as Block[])[2].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'second_name':
        (this.children.Inputs as Block[])[3].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'phone':
        (this.children.Inputs as Block[])[4].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'password':
        (this.children.Inputs as Block[])[5].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'password_repeat':
        (this.children.Inputs as Block[])[6].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      default:
        throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    (this.children.Inputs as Block[]).forEach((child) => {
      child.setProps({ class: 'form__input' });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
