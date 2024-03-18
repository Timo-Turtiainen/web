import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const createBlog = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (updatedBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const request = axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    { ...updatedBlog, user: updatedBlog.user.id },
    config
  );

  const response = await request;
  return response.data;
};

const deleteBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

export default { getAll, createBlog, updateBlog, deleteBlog };
