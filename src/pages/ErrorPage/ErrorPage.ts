import template from './error.hbs';
import Block from '../../components/Block';

export default class ErrorPage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
