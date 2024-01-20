import template from './profileItem.hbs';
import Block from '../Block.ts';
import { BlockProps } from '../../types/index.ts';

interface Props extends BlockProps{
  label: string;
  value: string | number;
}

export default class ProfileItem extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
