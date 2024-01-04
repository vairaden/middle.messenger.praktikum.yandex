import Router from "./utils/Router";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProgilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import AuthController from "./controllers/AuthController";

const enum Routes {
  Login = '/',
  Signup = '/sign-up',
  Profile = '/settings',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Login, LoginPage)
    .use(Routes.Signup, RegisterPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, HomePage)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Login:
    case Routes.Signup:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Login);
    }
  }
});
