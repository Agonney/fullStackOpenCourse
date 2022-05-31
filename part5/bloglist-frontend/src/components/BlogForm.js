import { useState } from "react"

const BlogForm = ({handleSubmit}) => {
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
          <input value={title} name='Title' onChange={({target}) => setTitle(target.value)}></input>
        </div>
        <div>author:
          <input value={author} name='Author' onChange={({target}) => setAuthor(target.value)}></input>
        </div>
        <div>url:
          <input value={url} name='Url' onChange={({target}) => setUrl(target.value)}></input>
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
    )
}

export default BlogForm