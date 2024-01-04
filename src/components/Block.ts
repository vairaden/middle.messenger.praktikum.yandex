import {nanoid} from 'nanoid';
import EventBus from '../utils/eventBus';
import isEqual from '../lib/isEqual';
import {BlockProps} from "../types";

interface Children {
  [key: string]: Block | Block[]
}

abstract class Block<P extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  protected props: P;

  public children: Children;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  constructor(propsWithChildren?: P) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps?: P) {
    const props: Record<string, unknown> = {};
    const children: Children = {};

    if (childrenAndProps) {
      Object.entries(childrenAndProps).forEach(([key, value]) => {
        if (value instanceof Block
          || (Array.isArray(value) && value.every((item) => item instanceof Block))) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });
    }

    return {props: props as P, children};
  }

  _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      if (events[eventName]) {
        this._element?.addEventListener(eventName, events[eventName]!);
      }
    });
  }

  _removeEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      if (events[eventName]) {
        this._element?.removeEventListener(eventName, events[eventName]!);
      }
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => item.dispatchComponentDidMount());
        return;
      }
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return isEqual(oldProps, newProps);
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected compile(template: (context: any) => string, props: any) {
    const contextAndStubs = {...props};

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((item) => `<div data-id="${item.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach((item) => {
          const stub = temp.content.querySelector(`[data-id="${item.id}"]`);

          if (!stub) {
            return;
          }

          item.getContent()?.append(...Array.from(stub.childNodes));
          stub.replaceWith(item.getContent()!);
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) {
          return;
        }

        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent()!);
      }
    });

    return temp.content;
  }

  protected render():
    DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target: P, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: P, prop: string, value) {
        const oldTarget = {...target};

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
