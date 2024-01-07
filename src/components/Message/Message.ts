import template from './message.hbs';
import Block from '../Block';
import { BlockProps } from '../../types';

interface Props extends BlockProps{
  text: string;
  time: string;
}

export default class Message extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
