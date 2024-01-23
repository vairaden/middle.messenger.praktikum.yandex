import { expect } from 'chai';
import sinon from 'sinon';
import Link from './Link.ts';
import Router from '../../utils/Router/Router.ts';

describe('Link', () => {
  it('should render', () => {
    new Link({ href: '/', Content: '' });
  });

  it('element should return span', () => {
    const link = new Link({ href: '/', Content: '' });
    const { element } = link;

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const link = new Link({ href: '/', Content: '' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
