import template from './profileItem.hbs';
import Block from '../../components/Block';
import { BlockProps } from '../../types';

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
