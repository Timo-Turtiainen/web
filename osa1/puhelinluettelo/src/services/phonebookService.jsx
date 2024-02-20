import axios from "axios";
const baseURL = "http://localhost:3001/persons";

// axios get all persons
const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(baseURL);
};

// Create new Person
const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

// Update person based on id
const updatePerson = (id, modifyPerson) => {
  const request = axios.put(`${baseURL}/${id}`, modifyPerson);
  return request.then((response) => response.data);
};

// Delete person based on id
const deletePerson = (id) => {
  const deleteURL = `${baseURL}/${id}`;

  const request = axios.delete(deleteURL);
  request
    .then((response) => {
      console.log(`Deleted id:${id} successfully:, ${response.data}`);
    })
    .catch((error) => {
      console.log("Error deleting resource");
    });
};

export default { getAll, createPerson, deletePerson, updatePerson };
