import template from './message.hbs';
import Block from '../Block.ts';
import { BlockProps } from '../../types/index.ts';
import './message.pcss';

interface Props extends BlockProps{
  modifier: string;
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
