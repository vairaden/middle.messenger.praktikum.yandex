import BaseAPI from '../BaseAPI';
import {SigninData, SignupData, SignupResponse, User} from "./authApiTypes";

export class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  signup(data: SignupData): Promise<SignupResponse> {
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
