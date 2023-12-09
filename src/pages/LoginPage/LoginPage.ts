import template from './login.hbs';
import Block from '../../components/Block';
import {render} from '../../lib/render';
import {Button} from '../../components/Button/Button';
import {checkLogin, checkPassword} from '../../lib/validators';
import {AuthFormInput} from '../../components/AuthFormInput/AuthFormInput';
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
            const {value} = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
              this.setError('login', true);
            } else {
              this.setError('login', false);
            }
          },
        }),
        new AuthFormInput({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          onBlur: (event: FocusEvent) => {
            const {value} = (event.target as HTMLInputElement);

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
        (this.children.Inputs as Block[])[0].setProps({error: state});
        break;
      case 'password':
        (this.children.Inputs as Block[])[1].setProps({error: state});
        break;

    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
