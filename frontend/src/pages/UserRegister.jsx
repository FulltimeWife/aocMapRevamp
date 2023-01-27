import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {registerUser, reset} from '../features/authentication/authSlice'
import Spinner from '../components/Spinner'

function UserRegister() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  })

  const {username, password, passwordConfirm} = formData

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

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== passwordConfirm) {
      toast.error("Passwords don't match")
    } else {
      const userData = {
        username, 
        password
      }

      dispatch(registerUser(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>
        Create account
      </p>
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
          <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm} placeholder="Confirm Password" onChange={onChange}></input>
        </div> 
        <div>
          <button type="submit" className="btn btn-block">Register</button>
        </div>
      </form>
    </section>
  </>
}

export default UserRegister