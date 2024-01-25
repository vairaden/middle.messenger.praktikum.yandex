import template from './settingsPage.hbs';
import Block from '../../components/Block/Block.ts';
import FormInput from '../../components/FormInput/FormInput.ts';
import {
  checkEmail, checkLogin, checkName, checkPassword, checkPhone,
} from '../../lib/validators.ts';
import Link from '../../components/Link/Link.ts';
import SettingsForm from '../../blocks/SettingsForm/SettingsForm.ts';
import { User } from '../../api/AuthApi/authApiTypes.ts';
import { BlockProps } from '../../types/index.ts';
import './settingsPage.pcss';
import UsersController from '../../controllers/UsersController.ts';
import { ChangePasswordData } from '../../api/UsersApi/usersApiTypes.ts';
import Avatar from '../../components/Avatar/Avatar.ts';
import withStore from '../../hooks/withStore/withStore.ts';

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
        Avatar: new Avatar({ src: props.user?.avatar }),
        DataForm: new SettingsForm({
          headerText: 'Изменить данные',
          Inputs: Object.entries(profileDataInputs).map(([name, attrs]) => new FormInput({
            name,
            type: attrs.type,
            label: attrs.label,
            placeholder: props.user && props.user[name as keyof User] ? props.user[name as keyof User].toString() : '-',
            value: props.user && props.user[name as keyof User] ? props.user[name as keyof User].toString() : '-',
            errorText: attrs.errorText,
            class: 'form__input_flat',
            onBlur: (event) => {
              const { value } = (event.target as HTMLInputElement);

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
            if (!checkLogin(values.display_name)) {
              this.setError('display_name', true);
              failedChecks = true;
            }
            if (!checkPhone(values.phone)) {
              this.setError('phone', true);
              failedChecks = true;
            }

            if (!failedChecks) {
              UsersController.changeProfileData(values as User);
            }
          },
        }),
        AvatarForm: new SettingsForm({
          headerText: 'Изменить аватар',
          Inputs: [
            new FormInput({
              name: 'avatar',
              type: 'file',
              label: 'Аватар',
              class: 'form__input_flat',
              accept: 'image/*',
            }),
          ],
          submitButtonText: 'Сохранить аватар',
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            UsersController.changeAvatar(formData);
          },
        }),
        PasswordForm: new SettingsForm({
          headerText: 'Сменить пароль',
          Inputs: [
            new FormInput({
              name: 'oldPassword',
              type: 'password',
              label: 'Старый пароль',
              placeholder: '********',
              errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
              class: 'form__input_flat',
              onBlur: (event) => {
                const { value } = (event.target as HTMLInputElement);

                if (!checkPassword(value)) {
                  this.setError('oldPassword', true);
                } else {
                  this.setError('oldPassword', false);
                }
              },
            }),
            new FormInput({
              name: 'newPassword',
              type: 'password',
              label: 'Новый пароль',
              placeholder: '********',
              errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
              class: 'form__input_flat',
              onBlur: (event) => {
                const { value } = (event.target as HTMLInputElement);

                if (!checkPassword(value)) {
                  this.setError('newPassword', true);
                } else {
                  this.setError('newPassword', false);
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

            if (!failedChecks) {
              UsersController.changePassword(values as ChangePasswordData).then(() => {
                this.clearPasswordForm();
              });
            }
          },
        }),
        Link: new Link({
          class: 'back-button',
          Content: '<img src="/back.svg" alt="Стрелка назад"/>',
          href: '/profile',
        }),
      },
    );
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    (this.children.Avatar as Block).setProps({ src: newProps.user.avatar });
    return super.componentDidUpdate(oldProps, newProps);
  }

  setError(name: string, state: boolean) {
    switch (name) {
      case 'email':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.DataForm.children.Inputs[0].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'login':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.DataForm.children.Inputs[1].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'first_name':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.DataForm.children.Inputs[2].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'second_name':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.DataForm.children.Inputs[3].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'display_name':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.DataForm.children.Inputs[4].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'phone':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.DataForm.children.Inputs[5].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'newPassword':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.PasswordForm.children.Inputs[0].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      case 'oldPassword':
        // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
        this.children.PasswordForm.children.Inputs[1].setProps({ class: `form__input_flat${state ? '_error' : ''}` });
        break;
      default:
        throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
    this.children.DataForm.children.Inputs.forEach((child) => {
      child.setProps({ class: 'form__input_flat' });
    });
    // @ts-expect-error: Property children does not exist on type Block<any> | Block<any>[]
    this.children.PasswordForm.children.Inputs.forEach((child) => {
      child.setProps({ class: 'form__input_flat' });
    });
  }

  clearPasswordForm() {
    const form = this.children.PasswordForm as Block;
    const element = form.element as HTMLFormElement;
    element.reset();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user }));
export default withUser(SettingsPage);
