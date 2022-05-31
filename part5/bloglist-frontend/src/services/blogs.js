import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newBlog, config)
  return await request
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return await request
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return await request
}

export default { getAll, create, update, deleteBlog, setToken }