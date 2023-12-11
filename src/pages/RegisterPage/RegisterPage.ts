import template from './registerPage.hbs';
import Block from '../../components/Block';
import FormInput from '../../components/FormInput/FormInput';
import {
  checkEmail, checkLogin, checkName, checkPassword, checkPhone,
} from '../../lib/validators';
import Link from '../../components/Link/Link';
import render from '../../lib/render';
import Button from '../../components/Button/Button';

export default class RegisterPage extends Block {
  constructor() {
    super({
      Link: new Link({
        Content: 'Войти',
        onClick: () => {
          render('login');
        },
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
          class: 'form__input',
          onBlur: (event: FocusEvent) => {
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
        submit: (event: SubmitEvent) => {
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

          console.log(values);

          render('home');
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
