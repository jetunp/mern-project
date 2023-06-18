import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

const Register = () => {

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
        <FaUser />Register
      </h1>
      <p>
        Please create an account
      </p>
    </section>
    <section className="form" onSubmit={onSubmit}>
      <form>
        <div className="form-group">
          <input type='text' className='form-control' id='name' name='name' placeholder='Enter your name...' value={name} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type='text' className='form-control' id='email' name='email' placeholder='Enter Email Address' value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type='text' className='form-control' id='password' name='password' placeholder='Enter Password' value={password} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type='text' className='form-control' id='rePassword' name='rePassword' placeholder='Confirm password' value={rePassword} onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'>Register</button>
        </div>
      </form>
    </section>
    </>
    
  )
}

export default Register