import template from './SettingsItemInput.hbs';
import Block from '../../components/Block';

export default class SettingsItemInput extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
