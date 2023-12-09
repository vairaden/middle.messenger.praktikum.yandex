import template from './register.hbs';
import Block from '../../components/Block';
import {AuthFormInput} from "../../components/AuthFormInput/AuthFormInput";
import {checkLogin} from "../../lib/validators";
import {Link} from "../../components/Link/Link";
import {render} from "../../lib/render";
import {Button} from "../../components/Button/Button";

export default class RegisterPage extends Block {
  constructor() {
    super({
      Link: new Link({
        onClick: () => {
          render('login');
        }
      }),
      Button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        class: 'button_primary',
      }),
      Inputs: [
        new AuthFormInput({
          label: 'Почта',
          type: 'email',
          name: 'email',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }), new AuthFormInput({
          label: 'Логин',
          type: 'text',
          name: 'login',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }), new AuthFormInput({
          label: 'Имя',
          type: 'text',
          name: 'first_name',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }), new AuthFormInput({
          label: 'Фамилия',
          type: 'text',
          name: 'second_name',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }), new AuthFormInput({
          label: 'Телефон',
          type: 'tel',
          name: 'phone',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }), new AuthFormInput({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }), new AuthFormInput({
          label: 'Пароль (ещё раз)',
          type: 'password',
          name: 'password_repeat',
          onBlur: (event: FocusEvent) => {

            const { value } = (event.target as HTMLInputElement);

            if (!checkLogin(value)) {
            }
          },
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
