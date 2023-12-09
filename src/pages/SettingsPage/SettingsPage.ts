import template from './settings.hbs';
import Block from '../../components/Block';

export default class SettingsPage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
