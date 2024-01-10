import template from './navbar.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';

const pages = ['home', 'login', 'register', 'profile', 'settings', 'NotFoundPage'];

export default class Navbar extends Block {
  constructor() {
    super({
      Links: pages.map((name) => {
        return new Link({
          Content: name,
          href: 'lolkekcheburek',
        });
      }),
    });
    this.getContent()!.style.padding = '6px';
  }

  render() {
    return this.compile(template, this.props);
  }
}
