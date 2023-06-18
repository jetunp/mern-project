import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

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
          <input type='text' className='form-control' id='email' name='email' placeholder='Enter Email Address' value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type='text' className='form-control' id='password' name='password' placeholder='Enter Password' value={password} onChange={onChange}/>
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