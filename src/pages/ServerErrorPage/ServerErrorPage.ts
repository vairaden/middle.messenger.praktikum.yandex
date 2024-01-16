import Block from '../../components/Block';
import ErrorBanner from '../../blocks/ErrorBanner/ErrorBanner';
import template from './serverErrorPage.hbs';

export default class ServerErrorPage extends Block {
  constructor() {
    super({
      Banner: new ErrorBanner({
        text: 'Мы уже фиксим',
        code: '500',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
