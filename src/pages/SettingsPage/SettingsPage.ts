import template from './settingsPage.hbs';
import Block from '../../components/Block';
import render from '../../lib/render';
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
  validator: (value: string) => boolean;
}
const profileDataInputs: Record<string, InputAttrs> = {
  Почта: {
    placeholder: 'pochta@yandex.ru', type: 'email', name: 'email', validator: checkEmail,
  },
  Логин: {
    placeholder: 'ivanivanov', type: 'text', name: 'login', validator: checkLogin,
  },
  Имя: {
    placeholder: 'Иван', type: 'text', name: 'first_name', validator: checkName,
  },
  Фамилия: {
    placeholder: 'Иванов', type: 'text', name: 'second_name', validator: checkName,
  },
  'Имя в чате': {
    placeholder: 'Иван', type: 'text', name: 'display_name', validator: checkLogin,
  },
  Телефон: {
    placeholder: '+79099673030', type: 'tel', name: 'phone', validator: checkPhone,
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
          class: 'form__input_flat',
          onBlur: (event: FocusEvent) => {
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
            class: 'form__input_flat',
            onBlur: (event: FocusEvent) => {
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
            class: 'form__input_flat',
            onBlur: (event: FocusEvent) => {
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
            render('profile');
          },
        }),
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

            render('profile');
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
