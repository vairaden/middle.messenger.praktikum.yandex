import template from './settingsPage.hbs';
import Block from '../../components/Block';
import FormInput from '../../components/FormInput/FormInput';
import {
  checkEmail, checkLogin, checkName, checkPassword, checkPhone,
} from '../../lib/validators';
import Link from '../../components/Link/Link';
import SettingsForm from '../../blocks/SettingsForm/SettingsForm';
import {withStore} from "../../utils/Store";
import {User} from "../../api/AuthApi/authApiTypes";
import {BlockProps} from "../../types";
import './settingsPage.pcss';

interface InputAttrs {
  label: string;
  type: string;
  errorText: string;
  validator: (value: string) => boolean;
}

const profileDataInputs: Record<string, InputAttrs> = {
  email: {
    label: 'Почта',
    type: 'email',
    validator: checkEmail,
    errorText: 'Может включать цифры и спецсимволы вроде дефиса и подчёркивания,'
      + ' обязательно должна быть «собака» (@) и точка после неё,'
      + ' но перед точкой обязательно должны быть буквы',

  },
  login: {
    label: 'Логин',
    type: 'text',
    validator: checkLogin,
    errorText: 'От 3 до 20 символов, латиница, может содержать цифры,'
      + ' но не состоять из них, без пробелов, без спецсимволов'
      + ' (допустимы дефис и нижнее подчёркивание)',
  },
  first_name: {
    label: 'Имя',
    type: 'text',
    validator: checkName,
    errorText: 'Первая буква должна быть заглавной,'
      + ' без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  second_name: {
    label: 'Фамилия',
    type: 'text',
    validator: checkName,
    errorText: 'Первая буква должна быть заглавной,'
      + ' без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  display_name: {
    label: 'Имя в чате',
    type: 'text',
    validator: checkLogin,
    errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,'
      + ' без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  },
  phone: {
    label: 'Телефон',
    type: 'tel',
    validator: checkPhone,
    errorText: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  },
};

interface Props extends BlockProps {
  user: User;
}

class SettingsPage extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        DataForm: new SettingsForm({
            headerText: 'Изменить данные',
            Inputs: Object.entries(profileDataInputs).map(([name, attrs]) => new FormInput({
              name: name,
              type: attrs.type,
              label: attrs.label,
              placeholder: props.user[name as keyof User] ? props.user[name as keyof User].toString() : '-',
              errorText: attrs.errorText,
              class: 'form__input_flat',
              onBlur: (event) => {
                const {value} = (event.target as HTMLInputElement);

                if (!attrs.validator(value)) {
                  this.setError(name, true);
                } else {
                  this.setError(name, false);
                }
              },
            })),
            submitButtonText: 'Изменить данные',
            onSubmit: (event) => {
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

              if (failedChecks) {

              }
            }
          }
        ),
        AvatarForm: new SettingsForm({
            headerText: 'Изменить аватар',
            Inputs: [
              new FormInput({
                name: 'avatar',
                type: 'file',
                label: 'Аватар',
                class: 'form__input_flat',
              }),
            ],
            submitButtonText: 'Сохранить аватар',
            onSubmit: () => {

            }
          }
        ),
        PasswordForm: new SettingsForm({
          headerText: 'Сменить пароль',
          Inputs: [
            new FormInput({
              name: 'newPassword',
              type: 'password',
              label: 'Новый пароль',
              placeholder: '********',
              errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
              class: 'form__input_flat',
              onBlur: (event) => {
                const {value} = (event.target as HTMLInputElement);

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
                const {value} = (event.target as HTMLInputElement);

                if (!checkPassword(value)) {
                  this.setError('oldPassword', true);
                } else {
                  this.setError('oldPassword', false);
                }
              },
            }),
          ],
          submitButtonText: 'Изменить пароль',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            this.resetFormErrors();
            let failedChecks = false;
            if (!checkPassword(values.newPassword)) {
              this.setError('newPassword', true);
              failedChecks = true;
            }
            if (!checkPassword(values.oldPassword)) {
              this.setError('oldPassword', true);
              failedChecks = true;
            }

            if (failedChecks) {

            }
          }
        }),
        Link: new Link({
          class: 'back-button',
          Content: '<img src="/back.svg" alt="Стрелка назад"/>',
          href: '/profile',
        }),
      },
    );
  }

  setError(name: string, state: boolean) {
    switch (name) {
      case 'email':
        // @ts-expect-error
        this.children.DataForm.children.Inputs[0].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'login':
        // @ts-expect-error
        this.children.DataForm.children.Inputs[1].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'first_name':
        // @ts-expect-error
        this.children.DataForm.children.Inputs[2].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'second_name':
        // @ts-expect-error
        this.children.DataForm.children.Inputs[3].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'display_name':
        // @ts-expect-error
        this.children.DataForm.children.Inputs[4].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'phone':
        // @ts-expect-error
        this.children.DataForm.children.Inputs[5].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'newPassword':
        // @ts-expect-error
        this.children.PasswordForm.children.Inputs[0].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      case 'oldPassword':
        // @ts-expect-error
        this.children.PasswordForm.children.Inputs[1].setProps({class: `form__input_flat${state ? '_error' : ''}`});
        break;
      default:
        throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    (this.children.ProfileDataInputs as Block[]).forEach((child) => {
      child.setProps({class: 'form__input_flat'});
    });
    (this.children.PasswordInputs as Block[]).forEach((child) => {
      child.setProps({class: 'form__input_flat'});
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({user: state.user}));
export default withUser(SettingsPage);
