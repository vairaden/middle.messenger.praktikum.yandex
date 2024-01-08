import store from '../utils/Store';
import router from '../utils/Router';
import MessagesController from './MessagesController';
import {User} from '../api/AuthApi/authApiTypes';
import UsersApi from "../api/UsersApi/UsersApi";
import {ChangePasswordData, ChangeProfileData} from "../api/UsersApi/usersApiTypes";

export class UsersController {
  private readonly api: typeof UsersApi;

  constructor() {
    this.api = UsersApi;
  }

  async changeProfileData(data: ChangeProfileData) {
    await this.api.changeProfile(data);
  }

  async changeAvatar(data: FormData) {
    await this.api.changeAvatar(data);

  }

  async changePassword(data: ChangePasswordData) {
    await this.api.changePassword(data);

  }

  async getUserById(id: string): Promise<User> {
    return await this.api.getUserById(id);

  }

  async searchUsers(login: string): Promise<User[]> {
    return this.api.searchUsers(login)
  }
}

export default new UsersController();
