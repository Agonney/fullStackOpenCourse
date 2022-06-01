import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    handleSubmit({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>title:
          <input value={title} name='Title' placeholder='enter title' id='title' onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>author:
          <input value={author} name='Author' placeholder='enter author' id='author' onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>url:
          <input value={url} name='Url' placeholder='enter url' id='url' onChange={({ target }) => setUrl(target.value)}></input>
        </div>

        <button type='submit' id='submitBlog'>create</button>
      </form>
    </div>
  )
}

export default BlogForm