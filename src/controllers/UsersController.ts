import store from '../utils/Store';
import router from '../utils/Router';
import MessagesController from './MessagesController';
import AuthApi from '../api/AuthApi/AuthApi';
import { SigninData, SignupData } from '../api/AuthApi/authApiTypes';

export class UsersController {
  private readonly api: typeof AuthApi;

  constructor() {
    this.api = AuthApi;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UsersController();