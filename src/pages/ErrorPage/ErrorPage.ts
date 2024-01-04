import template from './errorPage.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';

interface Props {
  code: string;
  text: string;
}

export default class ErrorPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      Link: new Link({
        class: 'link_centered',
        Content: 'Назад к чатам',
        onClick() {
          // render('home');
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
