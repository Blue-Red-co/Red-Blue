import React, { useState } from "react";
import "./Signup.css";
import req from "../../Axios/Axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



// Import CSS file

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [userMail, setUserMAil] = useState('');
  const nav = useNavigate();

  const callLoginReq = async (e) => {
    e.preventDefault()
    if (!userName || !pass) {
      toast.error("Enetr Somethging you Bitch")
    } else {
      const res = await req.post('/user/login', {
        userName, pass
      })
      if (res.data.errorCode !== '000000') {
        toast.error(res.data.errorDescription)
      } else {
        toast.success("Login sucess");
        nav('/home')
      }
    };
  }

  const callSignupReq = async (e) => {
    e.preventDefault()
    if (!userName || !pass || userMail) {
      toast.error("Enetr Somethging you Bitch")
    } else {
      const res = await req.post('/user/signup', {
        userName, userMail, pass
      })
      if (res.data.errorCode !== '000000') {
        toast.error(res.data.errorDescription)
      } else {
        toast.success("Account created Sucess")
      }
    };

  }
  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      {/* Forms Container */}
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-In Form */}
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
            </div>
            <input type="submit" value="Login" className="btn solid" onClick={callLoginReq} />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <button className="social-icon"><i className="fab fa-facebook-f"></i></button>
              <button className="social-icon"><i className="fab fa-twitter"></i></button>
              <button className="social-icon"><i className="fab fa-google"></i></button>
              <button className="social-icon"><i className="fab fa-linkedin-in"></i></button>
            </div>
          </form>

          {/* Sign-Up Form */}
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={userMail} onChange={(e) => { setUserMAil(e.target.value) }} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
            </div>
            <input type="submit" className="btn1" value="Sign up" onClick={callSignupReq} />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="https://sherin.fun" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://sherin.fun" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="https://sherin.fun" className="social-icon"><i className="fab fa-google"></i></a>
              <a href="https://sherin.fun" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>
        </div>
      </div>

      {/* Panels Container */}
      <div className="panels-container">
        {/* Left Panel */}
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button className="btn transparent" onClick={() => setIsSignUp(true)}>Sign up</button>
          </div>
          <img src="./log.svg" className="image" alt="Sign-up illustration" />
        </div>

        {/* Right Panel */}
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="btn transparent" onClick={() => setIsSignUp(false)}>Sign in</button>
          </div>
          <img src=".\register.svg" className="image" alt="Sign-in illustration" />
        </div>
      </div>

    </div>
  );
};

export default Login;
