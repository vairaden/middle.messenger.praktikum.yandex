import store from '../utils/Store';
import router from '../utils/Router';
import MessagesController from './MessagesController';
import AuthApi from '../api/AuthApi/AuthApi';
import { SigninData, SignupData } from '../api/AuthApi/authApiTypes';

export class AuthController {
  private readonly api: typeof AuthApi;

  constructor() {
    this.api = AuthApi;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      store.set('user', user);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }
}

export default new AuthController();
