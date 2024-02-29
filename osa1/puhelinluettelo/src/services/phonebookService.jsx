import axios from "axios";
const baseURL = "/api/persons";

// axios GET all persons
const getAll = async (callback) => {
  axios
    .get(baseURL)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => console.log("Error on getAll()", error));
};

// Create new Person
const createPerson = (newPerson, callback, error) => {
  axios
    .post(baseURL, newPerson)
    .then((response) => {
      callback(response.data);
    })
    .catch(error);
};

// Update person based on id
const updatePerson = (id, modifyPerson, callback, error) => {
  axios
    .put(`${baseURL}/${id}`, modifyPerson)
    .then((response) => {
      console.log(response.data);
      callback(response.data);
    })
    .catch(error);
};

// Delete person based on id
const deletePerson = (id) => {
  axios.delete(`${baseURL}/${id}`).then((response) => {
    return response.data;
  });
};
export default { getAll, createPerson, deletePerson, updatePerson };
