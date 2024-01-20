import Block from '../../components/Block/Block.ts';
import ErrorBanner from '../../blocks/ErrorBanner/ErrorBanner.ts';
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
