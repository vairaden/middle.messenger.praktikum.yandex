import template from './navbar.hbs';
import Block from '../../components/Block';
import Link from '../../components/Link/Link';
import render from '../../lib/render';

const pages = ['home', 'login', 'register', 'profile', 'settings', '404'];

export default class Navbar extends Block {
  constructor() {
    super({
      Links: pages.map((name) => {
        return new Link({
          Content: name,
          onClick() {
            render(name as any); // any чтобы была возможность перейти на 404
          },
        });
      }),
    });
    this.getContent()!.style.padding = '6px';
  }

  render() {
    return this.compile(template, this.props);
  }
}
