import { User } from '../api/AuthAPI';
import { ChatInfo } from '../api/ChatsAPI';
import { Message } from '../controllers/MessagesController';
import EventBus from "./eventBus";
import set from "../lib/set";
import Block from "../components/Block";

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

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// @ts-ignore
window.store = store;

export function withStore<SP extends Record<string, unknown>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends Record<string, unknown>>(Component: typeof Block<SP & P>){

    return class WithStore extends Component {

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps } as SP & P);
        });

      }

    }

  }
}

export default store;
