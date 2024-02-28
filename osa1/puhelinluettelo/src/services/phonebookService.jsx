import axios from "axios";
const baseURL = "/api/persons";

// axios GET all persons
const getAll = (callback) => {
  const request = axios.get(baseURL);
  console.log(baseURL);
  return request
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => console.log("Error getAll()", error));
};

// Create new Person
const createPerson = (newPerson, callback) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data).then(callback);
};

// Update person based on id
const updatePerson = (id, modifyPerson) => {
  const request = axios.put(`${baseURL}/${id}`, modifyPerson);
  return request.then((response) => {
    response.data;
  });
};

// Delete person based on id
const deletePerson = (id) => {
  axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createPerson, deletePerson, updatePerson };
