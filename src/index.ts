// import {HomePage} from './pages/Home';
import {Button} from './components/Button/Button';
import {registerComponent} from "./lib/registerComponent";
// import Card from "./components/Card";
import {render} from "./lib/render";

registerComponent('Button', Button);
// registerComponent('Card', Card);

window.addEventListener('DOMContentLoaded', () => {
  render('login')
});
