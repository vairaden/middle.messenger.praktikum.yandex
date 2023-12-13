import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProfilePage from '../pages/ProgilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import Layout from '../layouts/Layout';

const ROUTES = {
  home: HomePage,
  login: LoginPage,
  profile: ProfilePage,
  register: RegisterPage,
  settings: SettingsPage,
};

export default function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  let page;
  if (Page) {
    page = new Page();
  } else {
    page = new ErrorPage({ code: '404', text: 'Не туда попали' });
  }

  const layout = new Layout({ Page: page });

  root.append(layout.getContent()!);

  page.dispatchComponentDidMount();
}
