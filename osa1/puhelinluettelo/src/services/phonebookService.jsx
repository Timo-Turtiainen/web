import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(baseURL);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

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

export default { getAll, createPerson, deletePerson };
