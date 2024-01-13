import template from './loginPage.hbs';
import Block from '../../components/Block';
import Button from '../../components/Button/Button';
import { checkLogin, checkPassword } from '../../lib/validators';
import FormInput from '../../components/FormInput/FormInput';
import Link from '../../components/Link/Link';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthApi/authApiTypes';
import './loginPage.pcss';

export default class LoginPage extends Block {
  constructor() {
    super({
      Inputs: [
        new FormInput({
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
        }),
        new FormInput({
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
        }),
      ],
      Button: new Button({
        class: 'button_primary',
        type: 'submit',
        Content: 'Авторизоваться',
      }),
      Link: new Link({
        Content: 'Нет аккаунта?',
        href: '/sign-up',
      }),
      events: {
        submit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          this.resetFormErrors();
          let failedChecks = false;
          if (!checkLogin(values.login)) {
            this.setError('login', true);
            failedChecks = true;
          }
          if (!checkPassword(values.password)) {
            this.setError('password', true);
            failedChecks = true;
          }

          if (failedChecks) {
            return;
          }

          AuthController.signin(values as SignupData);
        },
      },
    });
  }

  setError(name: string, state: boolean) {
    switch (name) {
      case 'login':
        (this.children.Inputs as Block[])[0].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'password':
        (this.children.Inputs as Block[])[1].setProps({ class: `form__input${state ? '_error' : ''}` });
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
