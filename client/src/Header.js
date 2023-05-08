import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useContext} from 'react';
import { UserContext } from './UserContext';

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(async response => {
      const userInfo = await response.json()
      setUserInfo(userInfo)
    })
  }, [setUserInfo])

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null)
  }

  return (
    <header>
      <Link to="/" className='logo'>MyBlog</Link>
      <nav>
        {userInfo?.username ? 
          (
            <>
              <span>Hello, {userInfo.username}</span>
              <Link to='/create'>Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          ):
          (
            <>
              <Link to="/login">Login</Link>
              <Link to="register">Register</Link>
            </>
          )
        }
      </nav>
    </header>
  )
}