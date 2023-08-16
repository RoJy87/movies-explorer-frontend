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
      message: `Ошибка: ${res.status}, Причина: ${res.statusText}`,
    });
  };

  // заменить данные пользователя (PATCH)
  async setUserInfo(body) {
    const res = await fetch(`${this._url.userUrl}`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: body.name,
        email: body.email,
      }),
    });
    return this._checkResponse(res);
  }

  // получить список всех карточек в виде массива (GET)
  async getItems() {
    const res = await fetch(`${this._url.moviesUrl}`, {
      credentials: this._credentials,
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  // добавить карточку (POST)
  async setItems(movie) {
    const res = await fetch(`${this._url.moviesUrl}`, {
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
        movieId: movie.movieId,
      }),
      credentials: this._credentials,
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  // удалить карточку (DELETE)
  async deleteItem(id) {
    const res = await fetch(`${this._url.moviesUrl}/${id}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
}

export const mainApi = new MainApi({
  url,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
