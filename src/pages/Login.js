import React,{ useState} from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import '../App.css';

const logo1="images/task.png";

function Login() {

  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [errorMsg,setErrorMsg]=useState('');
  


  const onchangeEmail =(event)=>{ setEmail(event.target.value) }
  const onchangePass =(event)=>{ setPass(event.target.value) }

  const handleSubmit = () => {
    //reqres registered sample user
    if(email === "" || pass ==="" ){ setErrorMsg("Please Fill Email and Password"); return; }
    
    const loginPayload = { email: email, password: pass};

    axios
      .post("http://localhost:5000/login_control", loginPayload)
      .then((response) => {

        //get token from response
        // console.log(response.config.data); return;
        if(response.data.status === 200)
        {
            const token = response.data.token;

            //set JWT token to local
            localStorage.setItem("token", token);
            localStorage.setItem("task_email", email);

            //set token to axios common header
            setAuthToken(token);

            //redirect user to home page
            window.location.href = "/portal";

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
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + logo1}
            alt="login logo"
          />
        </div>
        <div className="text-center mt-4 name">3S Task Managment</div>
        <form
          onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}
          className="p-3 mt-3" >
          <div className="form-field d-flex align-items-center">
            <span className="fa fa-user" />
            <input
              type="text"
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
          <button type="submit"  className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
          <p className="text-danger">{errorMsg}</p>  
        </div>

        <div className="col-lg-12 mt-lg-5 mt-2 text-center">
            <p className="">Don't have account?</p>
            <a href="/register"><h4>Register Now</h4></a>
        </div>
      </div>
    </>
  );
}
export default Login;
