import template from './profileItem.hbs';
import Block from '../../components/Block';

interface Props {
  label: string;
  value: string | number;
}

export default class ProfileItem extends Block {
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
