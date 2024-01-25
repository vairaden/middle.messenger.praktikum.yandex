import BaseAPI from '../BaseAPI.ts';
import { User } from '../AuthApi/authApiTypes.ts';
import { ChangePasswordData, ChangeProfileData } from './usersApiTypes.ts';

export class UsersApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: ChangeProfileData) {
    return this.http.put('/profile', data);
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  changePassword(data: ChangePasswordData) {
    return this.http.put('/password', data);
  }

  getUserById(id: string): Promise<User> {
    return this.http.get(`/${id}`);
  }

  searchUsers(login: string): Promise<User[]> {
    return this.http.post('/search', { login });
  }
}

export default new UsersApi();
