import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
    }
    getBlogs()
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
      const user = await loginService.login({ username, password })
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

  const handleBlog = async (newBlog) => {
    try{
      await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
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

  return (
    <div>
      <Notification message={message} />
      {user === null
        ?
        <div>
          <h2>log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
        :
        <div>
          <h2>Blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={() => window.localStorage.clear()}>logout</button>
            <br></br>
          </div>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm handleSubmit={handleBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} loggedUser={user}/>
          )}
          <Users />
        </div>
      }
    </div>
  )
}

export default App
