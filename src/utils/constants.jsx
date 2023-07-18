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
