const { NODE_ENV } = process.env;

export const CREATE_USER_ERROR_CODE = 409;

export const MAIN_API = {
  baseUrl:
    NODE_ENV === 'production'
      ? 'https://api.simon.movies.nomoredomains.xyz'
      : 'http://localhost:3001',
  userUrl:
    NODE_ENV === 'production'
      ? 'https://api.simon.movies.nomoredomains.xyz/users/me'
      : 'http://localhost:3001/users/me',
  moviesUrl:
    NODE_ENV === 'production'
      ? 'https://api.simon.movies.nomoredomains.xyz/movies'
      : 'http://localhost:3001/movies'
};

export const MOVIES_API_BASE = 'https://api.nomoreparties.co';
export const MOVIES_API_REQUEST = 'https://api.nomoreparties.co/beatfilm-movies';

export const password = '[a-zA-Z0-9!@#$%^&*]{6,16}';

export const SHORTS_DURATION = 40;

export const WINDOW_SIZES = {
  pc: 1023,
  mobile: 480
};

export const MOVIES_QTY = {
  pc: 12,
  tablet: 8,
  mobile: 5
};

export const MOVIES_QTY_TO_ADD = {
  pc: 3,
  tablet: 2,
  mobile: 1
};
