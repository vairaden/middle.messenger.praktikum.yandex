import Block from '../components/Block.ts';
import template from './layout.hbs';
import Navbar from '../blocks/Navbar/Navbar.ts';

interface Props {
  Page: Block;
}
export default class Layout extends Block {
  constructor(props: Props) {
    super({
      Navbar: new Navbar(),
      Page: props.Page,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
