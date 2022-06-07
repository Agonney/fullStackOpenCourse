import { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getUsers().then(response => setUsers(response))
  }, [])

  console.log(users)

  return(
    <div>
      <table>
        <tr>
          <td></td>
          <td><b>blogs created</b></td>
        </tr>
      </table>
      {users.map(user => {
        <p key={user.username}>{user.name}   {user.blogs.length}</p>
      })}
    </div>
  )
}

export default Users