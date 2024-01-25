import { expect } from 'chai';
import sinon from 'sinon';
import Link from './Link.ts';
import Router from '../../utils/Router/Router.ts';

describe('Link', () => {
  it('should render', () => {
    new Link({
      href: '/',
      Content: '',
    });
  });

  it('element should return anchor element', () => {
    const { element } = new Link({
      href: '/',
      Content: '',
    });

    expect(element)
      .to
      .be
      .instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const link = new Link({
      href: '/',
      Content: '',
    });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce)
      .to
      .eq(true);
  });

  it('should call onClick function when clicked', () => {
    const spy = sinon.fake();
    const link = new Link({
      href: '/',
      Content: '',
      onClick: spy,
    });
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce)
      .to
      .eq(true);
  });

  it('should have passed class', () => {
    const link = new Link({
      href: '/',
      Content: '',
      class: 'kek',
    });
    const element = link.element as HTMLAnchorElement;

    expect(element.className)
      .to
      .include('kek');
  });
});
