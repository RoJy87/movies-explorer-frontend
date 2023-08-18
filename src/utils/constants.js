const { NODE_ENV } = process.env;

export const CREATE_USER_ERROR_CODE = 409;

export const SERVER_ERROR_MESSAGE =
  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const VALID_ERROR_MESSAGE = 'Неправильный логин или пароль';
export const DUBLICATE_ERROR_MESSAGE = 'E-mail занят';
export const UNDEFINED_ERROR_MESSAGE = 'Что-то пошло не так';
export const SUCCESS_LOGIN_MESSAGE = 'Вы успешно вошли!';
export const SUCCESS_REGISTER_MESSAGE = 'Регистрация прошла успешно!';
export const SUCCESS_UPDATE_MESSAGE = 'Информация обновлена';
export const EMPTY_SEARCH_ERROR_MESSAGE = 'Нужно ввести ключевое слово';

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
      : 'http://localhost:3001/movies',
};

export const MOVIES_API_BASE = 'https://api.nomoreparties.co';
export const MOVIES_API_REQUEST = 'https://api.nomoreparties.co/beatfilm-movies';

export const PASSWORD = '^(?=.*[a-zA-Z0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$';
export const EMAIL = '^[\\w.-]+@[\\w.-]+?\\.[a-zA-Z]{2,3}$';
export const NAME = '^[a-zA-Zа-яА-ЯёЁs -]{2,30}$';

export const SHORTS_DURATION = 40;

export const WINDOW_SIZES = {
  pc: 1280,
  mobile: 762,
};

export const MOVIES_QTY = {
  pc: 12,
  tablet: 8,
  mobile: 5,
};

export const MOVIES_QTY_TO_ADD = {
  pc: 3,
  tablet: 2,
  mobile: 2,
};
