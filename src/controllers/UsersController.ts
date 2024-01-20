import store from '../utils/Store/Store.ts';
import UsersApi from '../api/UsersApi/UsersApi.ts';
import { ChangePasswordData, ChangeProfileData } from '../api/UsersApi/usersApiTypes.ts';
import router from '../utils/Router/Router.ts';

export class UsersController {
  private readonly api: typeof UsersApi;

  constructor() {
    this.api = UsersApi;
  }

  async changeProfileData(data: ChangeProfileData) {
    try {
      const user = await this.api.changeProfile(data);
      store.set('user', user);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set('user', user);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }

  async changePassword(data: ChangePasswordData) {
    try {
      await this.api.changePassword(data);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }
}

export default new UsersController();
