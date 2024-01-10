import Block from '../../components/Block';
import template from './modal.hbs';
import './modal.pcss';
import { BlockProps } from '../../types';

interface Props extends BlockProps {
  onCancel: () => void;
  Content: Block;
  hidden: boolean;
}

export default class Modal extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        hidden: props.hidden,
        Content: props.Content,
        events: {
          click: () => {
            props.onCancel();
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
