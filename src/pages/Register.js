import React,{ useState} from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import '../App.css';

const logo1="images/register.png";

function Register() {

  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [name,setName]=useState('');
  const [errorMsg,setErrorMsg]=useState('');


  const onchangeEmail =(event)=>{ setEmail(event.target.value) }
  const onchangePass =(event)=>{ setPass(event.target.value) }
  const onchangeName =(event)=>{ setName(event.target.value) }

  const handleRegSubmit = () => {
    //reqres registered sample user
    if(email === "" || email === "" || pass ==="" ){ setErrorMsg("Please Fill all fields"); return; }
    
    const loginPayload = { name: name,email: email, password: pass};

    axios
      .post("http://localhost:5000/register_control", loginPayload)
      .then((response) => {
        if(response.data.status === 200)
        { 
            localStorage.setItem("task_email",email);
            window.location.href = "/confirmation";

        }else{
            setErrorMsg(response.data.msg);
            return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>

      <div className="wrapper">
        {/* <div className="logo">
          <img 
            src={process.env.PUBLIC_URL + logo1}
            alt="login logo"
          />
        </div> */}
        <div className="text-center mt-4 name">Sign Up Form</div>
        <form
          onSubmit={(event) => { event.preventDefault(); handleRegSubmit(); }}
          className="p-3 mt-3" >
          <div className="form-field d-flex align-items-center">
            <span className="fa fa-user" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              onChange={onchangeName}
              value={name}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fa fa-envelope" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={onchangeEmail}
              value={email}
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <span className="fa fa-key" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onchangePass}
              value={pass}
            />
          </div>
          <button type="submit"  className="btn mt-3">Create </button>
        </form>
        <div className="text-center fs-6">
          <p className="text-danger">{errorMsg}</p>  
        </div>

        <div className="col-md-12 text-center mt-lg-4 mt-2" >
            <p className="text-success  ">Already have Account?</p>
            <a href="./login"><h6>Login here</h6></a>
        </div>
      </div>
    </>
  );
}
export default Register;
