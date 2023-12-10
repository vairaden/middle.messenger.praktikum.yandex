import template from './login.hbs';
import Block from '../../components/Block';
import { render } from '../../lib/render';
import { Button } from '../../components/Button/Button';
import { checkLogin, checkPassword } from '../../lib/validators';
import { FormInput } from '../../components/FormInput/FormInput';
import { Link } from '../../components/Link/Link';

export default class LoginPage extends Block {
  constructor() {
    super({
      Inputs: [
        new FormInput({
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
        }),
        new FormInput({
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
        }),
      ],
      Button: new Button({
        class: 'button_primary',
        type: 'submit',
        text: 'Авторизоваться',
      }),
      Link: new Link({
        Content: 'Нет аккаунта?',
        onClick: () => {
          render('register');
        },
      }),
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          this.resetFormErrors();
          if (!checkLogin(values.login)) {
            this.setError('login', true);
            return;
          }
          if (!checkPassword(values.password)) {
            this.setError('password', true);
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
      case 'login':
        (this.children.Inputs as Block[])[0].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'password':
        (this.children.Inputs as Block[])[1].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
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
