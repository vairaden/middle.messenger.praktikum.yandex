import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport.ts';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error Type SinonFakeXMLHttpRequestStatic is missing the following properties from type
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests = [];
  });

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('Get');
  });

  it('.post() should send POST request', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.eq('Post');
  });

  it('.put() should send PUT request', () => {
    instance.put('/user');

    const [request] = requests;

    expect(request.method).to.eq('Put');
  });

  it('.patch() should send PATCH request', () => {
    instance.patch('/user');

    const [request] = requests;

    expect(request.method).to.eq('Patch');
  });

  it('.delete() should send DELETE request', () => {
    instance.delete('/user');

    const [request] = requests;

    expect(request.method).to.eq('Delete');
  });

  it('should add Content-Type header', () => {
    instance.post('/user', 'kek');

    const [request] = requests;

    expect(request.requestHeaders).to.include.keys('Content-Type');
  });

  it('should not add Content-Type header when sending FormData', () => {
    instance.post('/user', new FormData());

    const [request] = requests;

    expect(request.requestHeaders).not.to.include.keys('Content-Type');
  });
});
