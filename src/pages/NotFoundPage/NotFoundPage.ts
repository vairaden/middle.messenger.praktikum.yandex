import Block from '../../components/Block.ts';
import ErrorBanner from '../../blocks/ErrorBanner/ErrorBanner.ts';
import template from './notFoundPage.hbs';

export default class NotFoundPage extends Block {
  constructor() {
    super({
      Banner: new ErrorBanner({
        text: 'Не туда попали',
        code: '404',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
