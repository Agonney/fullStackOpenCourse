import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, loggedUser}) => {
  const [visible, setVisible] = useState(false)
  const [removable, setRemovable] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
    if(blog.user.username === loggedUser.username){
      setRemovable(true)
    }
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    await blogService.update(updatedBlog)
  }

  const handleRemove = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      await blogService.deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    console.log(blog),
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>

      {visible && 
        <div>
          <p>{blog.url}</p>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <p>{blog.user.name}</p>
        </div>
      }

      {removable && 
        <div>
          <button onClick={handleRemove}>remove</button>
        </div>
      }

   </div> 
  )
}

export default Blog