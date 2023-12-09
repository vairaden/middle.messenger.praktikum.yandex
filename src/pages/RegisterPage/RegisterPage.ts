import template from './register.hbs';
import Block from '../../components/Block';
import {AuthFormInput} from "../../components/AuthFormInput/AuthFormInput";
import {checkLogin} from "../../lib/validators";

export default class RegisterPage extends Block {
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
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
