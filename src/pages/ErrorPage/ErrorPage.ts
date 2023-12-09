import template from './error.hbs';
import Block from '../../components/Block';

export default class ErrorPage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
