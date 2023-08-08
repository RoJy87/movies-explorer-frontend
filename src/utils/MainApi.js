import { mainApiRequest as url } from './constants';

class MainApi {
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
      message: `Ошибка: ${res.status}, Причина: ${res.statusText}`
    });
  };

  // получить данные пользователя (GET)
  getUserInfo() {
    return fetch(`${this._url.userUrl}`, {
      credentials: this._credentials,
      headers: this._headers
    }).then(this._checkResponse);
  }

  // заменить данные пользователя (PATCH)
  setUserInfo(body) {
    return fetch(`${this._url.userUrl}`, {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: body.name,
        email: body.email,
      }),
    }).then(this._checkResponse);
  }

  // получить список всех карточек в виде массива (GET)
  getItems() {
    return fetch(`${this._url.moviesUrl}`, {
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // добавить/удалить фильм из избранного (DELETE/PUT)
  changeFavoriteStatus(id, isFavorite) {
    return fetch(`${this._url.moviesUrl}/${id}/saved`, {
      method: `${isFavorite ? "DELETE" : "PUT"}`,
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  url,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});
