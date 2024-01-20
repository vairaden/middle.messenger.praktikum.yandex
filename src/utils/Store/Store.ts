import set from '../../lib/set.ts';
import EventBus from '../EventBus/EventBus.ts';

export enum StoreEvents {
  Updated = 'updated'
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

export default new Store();
