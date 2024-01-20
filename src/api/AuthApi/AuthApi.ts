import BaseAPI from '../BaseAPI.ts';
import {
  SigninData, SignupData, User,
} from './authApiTypes.ts';

export class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthApi();
