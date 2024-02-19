import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

export default { getAll, create };
