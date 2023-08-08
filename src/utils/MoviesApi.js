import { beatFilmsApiRequest as url } from './constants';

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
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  // получить список всех карточек в виде массива (GET)
  getItems() {
    return fetch(`${this._url}`, {
      // credentials: this._credentials,
      headers: this._headers
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  url,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});
