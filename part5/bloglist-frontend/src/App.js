import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Logged in successfully')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } 
    catch (exception) {
      setMessage(`[ERROR] Login failed: ${exception.message}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(exception.message)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username
          <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}></input>
      </div>
      <div>password
          <input type='password' value={password} name='Password' onChange={({target}) => setPassword(target.value)}></input>
      </div>

      <button type='submit'>login</button>
    </form>
  )

  const handleBlog = async (e) => {
    e.preventDefault()

    try{
      const newBlog = {
        title,
        author,
        url
      }
      await blogService.create(newBlog)
      blogService.setToken(user.token)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('Blog added successfully')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception){
      setMessage(`[ERROR] Blog could not be added: ${exception.message}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(exception.message)
    }
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleBlog}>
        <div>title:
          <input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)}></input>
        </div>
        <div>author:
          <input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)}></input>
        </div>
        <div>url:
          <input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)}></input>
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      {user === null 
        ? 
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
        : 
        <div>
          <h2>Blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={() => window.localStorage.clear()}>logout</button>
            <br></br>
          </div>
          {blogForm()}
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
