import Axios from "axios";

export const API_BASE_URL = "https://preguntados-api.vercel.app/api";

const get = (url) =>
  Axios.get(url)
    .then((response) => response)
    .catch((error) => Promise.reject(error.response.data));

const post = (url, body) =>
  Axios.post(url, body)
    .then((response) => response)
    .catch((error) => Promise.reject(error.response.data));

const getDifficulty = () => {
  return get(`${API_BASE_URL}/difficulty`);
};

const getQuestions = (level) => {
  return get(`${API_BASE_URL}/questions?difficulty=${level}`);
};

const validateAnswer = (body) => {
  return post(`${API_BASE_URL}/answer`, body);
};

const Api = {
  getDifficulty,
  getQuestions,
  validateAnswer,
};

export default Api;
