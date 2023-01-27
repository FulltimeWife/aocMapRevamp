import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {loginUser, reset} from '../features/authentication/authSlice'
import Spinner from '../components/Spinner'

function UserLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const {username, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  if(isLoading) {
    return <Spinner />
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username,
      password
    }

    dispatch(loginUser(userData))
  }

  return <>
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="username" name="username" value={username} placeholder="Username" onChange={onChange}></input>
        </div> 
        <div className="form-group">
          <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={onChange}></input>
        </div> 
        <div className="form-group">
          <button type="submit" className="btn btn-block">Login</button>
        </div>
      </form>
    </section>
  </>
}

export default UserLogin