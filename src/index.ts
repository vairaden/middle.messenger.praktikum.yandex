import Router from './utils/Router/Router.ts';
import ProfilePage from './pages/ProgilePage/ProfilePage.ts';
import HomePage from './pages/HomePage/HomePage.ts';
import AuthController from './controllers/AuthController/AuthController.ts';
import SettingsPage from './pages/SettingsPage/SettingsPage.ts';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.ts';
import LoginPage from './pages/LoginPage/LoginPage.ts';
import RegisterPage from './pages/RegisterPage/RegisterPage.ts';
import ServerErrorPage from './pages/ServerErrorPage/ServerErrorPage.ts';

const enum Routes {
  Login = '/',
  Signup = '/sign-up',
  Profile = '/profile',
  Settings = '/settings',
  Messenger = '/messenger',
  ServerError = '/500'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Login, LoginPage)
    .use(Routes.Signup, RegisterPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Messenger, HomePage)
    .use(Routes.ServerError, ServerErrorPage)
    .useNotFoundRoute(NotFoundPage);

  let isProtectedRoute = false;
  let isAuthRoute = false;

  switch (window.location.pathname) {
    case Routes.Profile:
    case Routes.Settings:
    case Routes.Messenger:
      isProtectedRoute = true;
      break;
  }

  switch (window.location.pathname) {
    case Routes.Signup:
    case Routes.Login:
      isAuthRoute = true;
  }

  try {
    await AuthController.fetchUser();
    Router.start();
    if (isAuthRoute) {
      Router.go(Routes.Messenger);
    }
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go(Routes.Login);
    }
  }
});
