import template from './MessageControls.hbs';
import Block from '../../components/Block';

export default class MessageControls extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
