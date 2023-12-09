import template from './login.hbs';
import Block from '../../components/Block';
import { render } from '../../lib/render';
import { Button } from '../../components/Button/Button';
import { checkLogin, checkPassword } from '../../lib/validators';
import { AuthFormInput } from '../../components/AuthFormInput/AuthFormInput';
import {Link} from "../../components/Link/Link";

export default class LoginPage extends Block {
  constructor() {
    super({
      Inputs: [
        new AuthFormInput({
          label: 'Логин',
          type: 'text',
          name: 'login',
          onBlur: (event: FocusEvent) => {
            console.log('blur');

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
              console.log('Login err');
            }
          },
        }),
        new AuthFormInput({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          onBlur: (event: FocusEvent) => {
            console.log('blur');
            const { value } = (event.target as HTMLInputElement);

            if (!checkPassword(value)) {
              console.log('Login err');
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
        onClick: () => {
          render('register');
        }
      }),
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          if (!checkLogin(values.login)) {
            console.log('Login err');
            return;
          }
          if (!checkPassword(values.password)) {
            console.log('Login err');
            return;
          }

          render('home');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
