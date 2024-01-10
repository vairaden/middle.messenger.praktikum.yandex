import store from '../utils/Store';
import { User } from '../api/AuthApi/authApiTypes';
import UsersApi from '../api/UsersApi/UsersApi';
import { ChangePasswordData, ChangeProfileData } from '../api/UsersApi/usersApiTypes';

export class UsersController {
  private readonly api: typeof UsersApi;

  constructor() {
    this.api = UsersApi;
  }

  async changeProfileData(data: ChangeProfileData) {
    const user = await this.api.changeProfile(data);
    store.set('user', user);
  }

  async changeAvatar(data: FormData) {
    const user = await this.api.changeAvatar(data);
    store.set('user', user);
  }

  async changePassword(data: ChangePasswordData) {
    await this.api.changePassword(data);
  }

  async getUserById(id: string): Promise<User> {
    return this.api.getUserById(id);
  }

  async searchUsers(login: string): Promise<User[]> {
    return this.api.searchUsers(login);
  }
}

export default new UsersController();
