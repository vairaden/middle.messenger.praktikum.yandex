export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
};

type HTTPMethod = <R=unknown>(path: string, data?: unknown) => Promise<R>

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path = '/') => {
    return this.request(this.endpoint + path);
  };

  public post: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  };

  public put: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  };

  public patch: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  };

  public delete: HTTPMethod = (path: string, data?: unknown) => {
    return this.request(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  };

  private request(url: string, options: Options = { method: Method.Get }): Promise<any> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('network error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (data instanceof FormData) {
        xhr.send(data);
        return;
      }

      xhr.setRequestHeader('Content-Type', 'application/json');

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
