import { Message } from '../controllers/MessagesController';
import set from '../lib/set';
import { User } from '../api/AuthApi/authApiTypes';
import { ChatInfo } from '../api/ChatsApi/chatsApiTypes';
import EventBus from './eventBus';
import Block from '../components/Block';
import { BlockProps } from '../types';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  constructor() {
    super();
    this.on(StoreEvents.Updated, () => {});
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
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

export default store;
