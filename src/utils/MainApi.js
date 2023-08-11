import { MAIN_API as url } from './constants';

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
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: body.name,
        email: body.email
      })
    }).then(this._checkResponse);
  }

  // получить список всех карточек в виде массива (GET)
  getItems() {
    return fetch(`${this._url.moviesUrl}`, {
      credentials: this._credentials,
      headers: this._headers
    }).then(this._checkResponse);
  }

  // добавить карточку (POST)
  setItems(movie) {
    return fetch(`${this._url.moviesUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId
      }),
      credentials: this._credentials,
      headers: this._headers
    }).then(this._checkResponse);
  }

  // удалить карточку (DELETE)
  deleteItem(id) {
    return fetch(`${this._url.moviesUrl}/${id}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers
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
