import React, { useState } from "react";
import "./Signup.css";
import abc from "../../Axios/Axios"



 // Import CSS file

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
    
  abc.post('/login')
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
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <button  className="social-icon"><i className="fab fa-facebook-f"></i></button>
              <button  className="social-icon"><i className="fab fa-twitter"></i></button>
              <button  className="social-icon"><i className="fab fa-google"></i></button>
              <button  className="social-icon"><i className="fab fa-linkedin-in"></i></button>
            </div>
          </form>

          {/* Sign-Up Form */}
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn1" value="Sign up" />
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
          <img src="./log.svg"className="image" alt="Sign-up illustration" />
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
