import Router from './utils/Router';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProgilePage/ProfilePage';
import HomePage from './pages/HomePage/HomePage';
import AuthController from './controllers/AuthController';
import SettingsPage from './pages/SettingsPage/SettingsPage';

const enum Routes {
  Login = '/',
  Signup = '/sign-up',
  Profile = '/profile',
  Settings = '/settings',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Login, LoginPage)
    .use(Routes.Signup, RegisterPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Messenger, HomePage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Login:
    case Routes.Signup:
      isProtectedRoute = false;
      break;
  }

  // email:"keklol@mail.ru"
  // first_name:"Boris"
  // login:"kek"
  // password:"Lolkek123"
  // password_repeat:"Lolkek123"
  // phone:"79999999999"
  // second_name:"Avgust"

  // login: "kek"
  // password: "Lolkek123"

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Login);
    }
  }
});
