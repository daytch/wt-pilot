import api from "./api";

export default (token) => {
  if (token) {
    api.defaults.headers.common["x-access-token"] = token;
  } else {
    delete api.defaults.headers.common.authorization;
  }
};
