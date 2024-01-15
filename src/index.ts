import Router from './utils/Router';
import ProfilePage from './pages/ProgilePage/ProfilePage';
import HomePage from './pages/HomePage/HomePage';
import AuthController from './controllers/AuthController';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ServerErrorPage from "./pages/ServerErrorPage/ServerErrorPage";

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
