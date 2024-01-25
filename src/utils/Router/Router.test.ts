import { expect } from 'chai';
import sinon from 'sinon';
import Router, { BlockConstructable } from './Router.ts';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    Router.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('.use() should return Router instance', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

  it('.useNotFoundRoute() should return Router instance', () => {
    const result = Router.useNotFoundRoute(BlockMock);

    expect(result).to.eq(Router);
  });

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.go() should render a page on history back action', () => {
    Router
      .use('/', BlockMock)
      .start();

    Router.go('/');

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.back() should render a page on history back action', () => {
    Router
      .use('/', BlockMock)
      .start();

    Router.back();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.forward() should render a page on history back action', () => {
    Router
      .use('/', BlockMock)
      .start();

    Router.forward();

    expect(getContentFake.callCount).to.eq(1);
  });
});
