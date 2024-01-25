import { User } from '../../api/AuthApi/authApiTypes.ts';
import { ChatInfo } from '../../api/ChatsApi/chatsApiTypes.ts';
import Message from '../../components/Message/Message.ts';
import { BlockProps } from '../../types/index.ts';
import Block from '../../components/Block/Block.ts';
import store, { StoreEvents } from '../../utils/Store/Store.ts';

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export default function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends BlockProps, SP>(Component: typeof Block<P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps } as SP & P);
        });
      }
    };
  };
}
