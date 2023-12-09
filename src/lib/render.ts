// import {HomePage} from "../pages/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";

const ROUTES = {
  // 'home': HomePage,
  'login': LoginPage,
}

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
