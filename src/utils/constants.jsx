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

export const password = "[a-zA-Z0-9!@#$%^&*]{6,16}";

export const navLinks = [
  {
    title: "Главная",
    to: "/",
  },
  {
    title: "Фильмы",
    to: "/",
  },
  {
    title: "Сохраненные фильмы",
    to: "/",
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
