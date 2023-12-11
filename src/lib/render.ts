import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProfilePage from '../pages/ProgilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';

const ROUTES = {
  home: HomePage,
  login: LoginPage,
  error: ErrorPage,
  profile: ProfilePage,
  register: RegisterPage,
  settings: SettingsPage,
};

export default function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
