const { NODE_ENV } = process.env;

export const mainApiRequest = {
  baseUrl:
    NODE_ENV === 'production'
      ? 'https://api.simon.movies.nomoredomains.xyz'
      : 'http://localhost:3000',
  userUrl:
    NODE_ENV === 'production'
      ? 'https://api.simon.movies.nomoredomains.xyz/users/me'
      : 'http://localhost:3000/users/me',
  cardsUrl:
    NODE_ENV === 'production'
      ? 'https://api.simon.movies.nomoredomains.xyz/movies'
      : 'http://localhost:3000/cards'
};

export const beatFilmsApiRequest = 'https://api.nomoreparties.co/beatfilm-movies';

export const password = '[a-zA-Z0-9!@#$%^&*]{6,16}';

export const windowSizes = {
  pc: 1023,
  mobile: 480
};

export const cardsQty = {
  pc: 12,
  tablet: 8,
  mobile: 5
};

export const cardsQtyToAdd = {
  pc: 3,
  tablet: 2,
  mobile: 1
};
