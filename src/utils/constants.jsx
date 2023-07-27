const { NODE_ENV } = process.env;

export const urlRequest = {
  baseUrl:
    NODE_ENV === "production"
      ? "https://api.simon.movies.nomoredomains.xyz"
      : "http://localhost:3000",
  userUrl:
    NODE_ENV === "production"
      ? "https://api.simon.movies.nomoredomains.xyz/users/me"
      : "http://localhost:3000/users/me",
  cardsUrl:
    NODE_ENV === "production"
      ? "https://api.simon.movies.nomoredomains.xyz/movies"
      : "http://localhost:3000/cards",
};

export const beatFilmsRequest = "https://api.nomoreparties.co/beatfilm-movies";

export const password = "[a-zA-Z0-9!@#$%^&*]{6,16}";

export const navLinks = [
  {
    title: "Фильмы",
    to: "/movies",
  },
  {
    title: "Сохраненные фильмы",
    to: "/saved-movies",
  },
];

export const aboutProjectList = [
  {
    title: "Дипломный проект включал 5 этапов",
    text: "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
  },
  {
    title: "На выполнение диплома ушло 5 недель",
    text: "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
  },
];

export const techsList = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Express.js",
  "mongoDB",
];

export const portfolioList = [
  {
    name: "Статичный сайт",
    adress: "https://rojy87.github.io/how-to-learn/",
  },
  {
    name: "Адаптивный сайт",
    adress: "https://rojy87.github.io/russian-travel/",
  },
  {
    name: "Одностраничное приложение",
    adress: "https://rojy87.github.io/react-mesto-auth",
  },
];

export const screenWidth = window.screen.availWidth;

export const screenSizeM = 768;
