import Router from './utils/Router';
import ProfilePage from './pages/ProgilePage/ProfilePage';
import HomePage from './pages/HomePage/HomePage';
import AuthController from './controllers/AuthController';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

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
    .use(Routes.Messenger, HomePage)
    .useNotFoundRoute(NotFoundPage);

  let isProtectedRoute = false;

  switch (window.location.pathname) {
    case Routes.Profile:
    case Routes.Settings:
    case Routes.Messenger:
      isProtectedRoute = true;
      break;
  }

  try {
    await AuthController.fetchUser();
    Router.start();
    Router.go(window.location.pathname);
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go(Routes.Login);
    } else {
      Router.go(window.location.pathname);
    }
  }
});
