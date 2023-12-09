const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface Options {
  method: Methods,
  data: Record<string, any>,
  headers: Record<string, string>,
  timeout: number,
  retries: number,
}

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).reduce((acc, [key, value], index, arr) => {
    return acc + key + '=' + value.toString() + (arr.length - 1 === index ? '' : '&');
  }, '?');
}

export async function request(url: string, options: Options): Promise<XMLHttpRequest> {
  const {method = 'GET', data, headers = {}, timeout = 5000} = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url + (data && method === Methods.GET ? queryStringify(data) : ''));
    xhr.timeout = timeout;

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    })

    xhr.onload = function () {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (method === Methods.GET || !data) {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data));
    }
  });
}

export async function fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {
  function onErr(err: Error) {
    if (options.retries === 0) {
      throw err;
    }

    return fetchWithRetry(url, {...options, retries: options.retries - 1});
  }

  try {
    return await request(url, options);
  } catch (err: any) {
    return onErr(err);
  }
}
