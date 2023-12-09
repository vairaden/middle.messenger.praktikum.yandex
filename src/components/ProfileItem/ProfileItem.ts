import template from './ProfileItem.hbs';
import Block from '../../components/Block';

export default class ProfileItem extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
