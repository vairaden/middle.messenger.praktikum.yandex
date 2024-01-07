import template from './message.hbs';
import Block from '../Block';

interface Props {
  text: string;
  time: string;
}

export default class Message extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
