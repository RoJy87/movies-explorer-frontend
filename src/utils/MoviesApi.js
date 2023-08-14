import { MOVIES_API_REQUEST as url } from './constants';

class MoviesApi {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      err: res,
      message: `Ошибка: ${res.status}, Причина: ${res.statusText}`,
    });
  };

  // получить список всех карточек в виде массива (GET)
  async getItems() {
    const res = await fetch(`${this._url}`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
}

export const moviesApi = new MoviesApi({
  url,
  headers: {
    'Content-Type': 'application/json',
  },
});
