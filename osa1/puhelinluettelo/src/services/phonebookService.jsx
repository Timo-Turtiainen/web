import axios from "axios";
const baseURL = "/api/persons";

// axios GET all persons
const getAll = (callback) => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data).then(callback);
};

// Create new Person
const createPerson = (newPerson, callback) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data).then(callback);
};

// Update person based on id
const updatePerson = async (id, modifyPerson) => {
  const request = axios.put(`${baseURL}/${id}`, modifyPerson);
  const response = await request;
  return response.data;
};

// Delete person based on id
const deletePerson = (id) => {
  axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createPerson, deletePerson, updatePerson };
