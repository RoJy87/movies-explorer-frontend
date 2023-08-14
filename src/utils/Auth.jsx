import { MAIN_API as url } from './constants';

class Auth {
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

  register = async (name, email, password) => {
    const res = await fetch(`${this._url.baseUrl}/signup`, {
      method: 'POST',
      credentials: this._credentials,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return this._checkResponse(res);
  };

  authorize = async (email, password) => {
    const res = await fetch(`${this._url.baseUrl}/signin`, {
      method: 'POST',
      credentials: this._credentials,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return this._checkResponse(res);
  };

  logout = async () => {
    const res = await fetch(`${this._url.baseUrl}/signout`, {
      method: 'POST',
      credentials: this._credentials,
    });
    return this._checkResponse(res);
  };

  getAuthInfo = async () => {
    const res = await fetch(`${this._url.userUrl}`, {
      credentials: this._credentials,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return this._checkResponse(res);
  };
}

export const auth = new Auth({
  url,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
