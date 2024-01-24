/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import sinon from 'sinon';
import esmock from 'esmock';
import authController from './AuthController.ts';

const mockFunctions = {
  signin: sinon.fake(),
  signup: sinon.fake(),
  logout: sinon.fake(),
  read: sinon.fake(),
  set: sinon.fake(),
  go: sinon.fake(),
  closeAll: sinon.fake(),
};

let AuthController: typeof authController;

describe('AuthController', async () => {
  beforeEach(async () => {
    AuthController = (await esmock('./Authcontroller', {
      '../../api/AuthApi/AuthApi.ts': {
        default: new class {
          read = mockFunctions.read;

          signin = mockFunctions.signin;

          signup = mockFunctions.signup;

          logout = mockFunctions.logout;
        }(),
      },
      '../../utils/Store/Store.ts': {
        default: new class {
          set = mockFunctions.set;
        }(),
      },
      '../../utils/Router/Router.ts': {
        default: new class {
          go = mockFunctions.go;
        }(),
      },
      '../MessagesController.ts': {
        default: new class {
          closeAll = mockFunctions.closeAll;
        }(),
      },
    })).default;
  });

  describe('.fetchUser()', () => {
    it('should call read() method of api', async () => {
      await AuthController.fetchUser();

      expect(mockFunctions.read.called)
        .to.be.true;
    });

    it('should set user data in store', async () => {
      await AuthController.fetchUser();

      expect(mockFunctions.set.lastCall.firstArg)
        .to
        .eq('user');
    });
  });

  describe('.signin()', () => {
    it('should redirect to /messenger', async () => {
      await AuthController.signin({
        login: 'kek',
        password: 'kek',
      });

      expect(mockFunctions.go.lastCall.firstArg)
        .to
        .eq('/messenger');
    });

    it('should call signin() method of api', async () => {
      await AuthController.signin({
        login: 'kek',
        password: 'kek',
      });

      expect(mockFunctions.signin.called)
        .to.be.true;
    });
  });

  describe('.signup()', () => {
    it('should redirect to /messenger', async () => {
      await AuthController.signup({
        login: 'kek',
        password: 'kek',
        email: 'kek',
        first_name: 'kek',
        second_name: 'kek',
        phone: 'kek',
      });

      expect(mockFunctions.go.lastCall.firstArg)
        .to
        .eq('/messenger');
    });

    it('should call signup() method of api', async () => {
      await AuthController.signup({
        login: 'kek',
        password: 'kek',
        email: 'kek',
        first_name: 'kek',
        second_name: 'kek',
        phone: 'kek',
      });

      expect(mockFunctions.signup.called)
        .to.be.true;
    });
  });

  describe('.logout()', () => {
    it('should call closeAll() method of MessagesController', () => {
      AuthController.logout();

      expect(mockFunctions.closeAll.called)
        .to.be.true;
    });

    it('should call logout() method of api', () => {
      AuthController.logout();

      expect(mockFunctions.logout.called)
        .to.be.true;
    });

    it('should redirect to /', () => {
      AuthController.logout();

      expect(mockFunctions.go.lastCall.firstArg)
        .to
        .eq('/');
    });
  });
});
