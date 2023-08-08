const { NODE_ENV } = process.env;

export const CREATE_USER_ERROR_CODE = 409;

export const mainApiRequest = {
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

export const beatFilmsApiBase = 'https://api.nomoreparties.co';
export const beatFilmsApiRequest = 'https://api.nomoreparties.co/beatfilm-movies';

export const password = '[a-zA-Z0-9!@#$%^&*]{6,16}';

export const windowSizes = {
  pc: 1023,
  mobile: 480
};

export const moviesQty = {
  pc: 12,
  tablet: 8,
  mobile: 5
};

export const moviesQtyToAdd = {
  pc: 3,
  tablet: 2,
  mobile: 1
};
