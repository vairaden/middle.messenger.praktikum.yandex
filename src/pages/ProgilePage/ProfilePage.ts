import template from './profile.hbs';
import Block from '../../components/Block';

export default class ProfilePage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
