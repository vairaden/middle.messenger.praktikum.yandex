import template from './errorPage.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';
import { BlockProps } from '../../types';
import './errorPage.pcss';

interface Props extends BlockProps {
  code: string;
  text: string;
}

export default class ErrorPage extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      Link: new Link({
        class: 'link_centered',
        Content: 'Назад к чатам',
        href: '/messenger',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
