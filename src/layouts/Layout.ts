import Block from '../components/Block';
import template from './layout.hbs';
import Navbar from '../blocks/Navbar/Navbar';

interface Props {
  Page: Block;
}
export default class Layout extends Block {
  constructor(props: Props) {
    console.log(props);
    super({
      Navbar: new Navbar(),
      Page: props.Page,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
