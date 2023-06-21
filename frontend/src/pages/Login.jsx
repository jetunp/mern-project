import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
//useSelector is used to select something from the state (use, isLoading etc)
// useDispatcher will be used when we wanna use the reducer functions like reset of thunk function register
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spin from '../components/Spin'


const Login = () => {

  //Component level states will go here
  const [formaData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    rePassword:'',
  }
  )

  //destructure the object to easily use its elements
  const {name, email, password, rePassword} = formaData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

   // we will be watching few things if those changes
  // the dependency array is gonna take in bunch of dependencies
  // so anything we put there it will fire of useEffect if any of them changes
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  },[user, message, navigate, dispatch, isError, isSuccess])

  //when input is provided
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name] : e.target.value
    }))
  }
  
  //when the form is submitted
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,password
    }

    dispatch(login(userData))
  }

  

  if(isLoading){
    return <Spin />
  }


  return (
    <>
    <section className="heading">
      <h1>
        <FaSignInAlt />Login
      </h1>
      <p>
        Login and start setting goals
      </p>
    </section>
    <section className="form" onSubmit={onSubmit}>
      <form>
        <div className="form-group">
          <input type='email' className='form-control' id='email' name='email' placeholder='Enter Email Address' value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type='password' className='form-control' id='password' name='password' placeholder='Enter Password' value={password} onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'>Login</button>
        </div>
      </form>
    </section>
    </>
    
  )
}

export default Login