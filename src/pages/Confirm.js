import React,{ useState} from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import '../App.css';
import '../home.css';

const logo1="images/confirm.gif";

function Confirm() {

  return (
    <>

      <div className="wrapper">
        <div className="logo">
          <img style={{width:"100px",height:"100px"}}
            src={process.env.PUBLIC_URL + logo1}
            alt="login logo"
          />
        </div>
        <div className="text-center mt-4 name">Registration successfully</div>
       

        <div className="col-md-12 text-center mt-lg-4 mt-2" >
            <a href="./login" className="btn text-dark" ><h6>Login here</h6></a>
        </div>
      </div>
    </>
  );
}
export default Confirm;
