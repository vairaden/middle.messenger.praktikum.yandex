import Block from '../Block/Block.ts';
import template from './avatar.hbs';
import { BlockProps } from '../../types/index.ts';
import './avatar.pcss';

interface Props extends BlockProps {
  src: string;
}

export default class Avatar extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
