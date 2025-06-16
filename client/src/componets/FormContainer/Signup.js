import React, { useState, useRef } from "react";
import "./Signup.css"; // Your CSS file
import req from "../../Axios/Axios"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";


function App() {
  const nav = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  // Refs for OTP inputs to manage focus
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSignInClick = () => setIsSignUpMode(false);
  const handleSignUpClick = () => setIsSignUpMode(true);

  const handleShowOtp = () => setShowOtp(true);
  const handleHideOtp = () => setShowOtp(false);
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('')
  const [userMail, setUserMail] = useState('');
  const [userId, setUserId] = useState('')
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newstringOtp, setNewOtp] = useState('')

  // Handle OTP input change and auto focus next input
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp]; // Copy current OTP state
    newOtp[index] = value; // Update the specific index
    setOtp(newOtp); // Update state

    const otpString = newOtp.join("");
    setNewOtp(otpString)
    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus(); // Move focus to next input
    }
  };

  // Convert OTP array to a single string when needed

  // Optional: handle backspace to move focus back
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };


  const handleLoginReq = async () => {
    if (!userName && !pass) {
      toast.error("Enter something bitch")
    } else {
      const res = await req.post('/user/login', { userName, pass })
      if (res.data.errorCode !== '000000') {
        toast.error(res.data.errorDescription)
      } else {
        toast.success("You got inside me")

      }
    }
  }

  const handleSignupreq = async () => {
    if (!userMail && !userName && !pass) {
      toast.error("Enter Something bitch")
    } else {
      const res = await req.post('/user/signup', { userName, userMail, pass });
      if (res.data.errorCode !== "000000") {
        toast.error(res.data.errorDescription);
      } else {
        toast.success("you got saved by me");
        handleShowOtp();
        setUserId(res.data.Data.insertId)
      }
    }
  }

  const handleVerfiyOtp = async () => {
    const res = await req.post('user/verifyotp', { userId, otp: newstringOtp })
    if (res.data.errorCode !== "000000") {
      toast.error(res.data.errorDescription);
    } else {
      toast.success(res.data.errorDescription)
      handleHideOtp()
      nav('/home')
    }
  }

  return (
    <div className="app-wrapper">
      {/* Main login/signup UI */}
      <div className={`main-content ${showOtp ? "blurred" : ""}`}>
        <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <div className="forms-container">
            <div className="signin-signup">
              {/* Sign In Form */}
              <form action="#" className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                </div>
                <button type="button" className="btn" onClick={handleLoginReq}>
                  Login
                </button>
              </form>

              {/* Sign Up Form */}
              <form action="#" className="sign-up-form">
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input type="email" placeholder="Email" value={userMail} onChange={(e) => { setUserMail(e.target.value) }} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                </div>
                <button type="button" className="btn1" onClick={handleSignupreq}>
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          <div className="panels-container">
            {/* Left Panel */}
            <div className="panel left-panel">
              <div className="content">
                <h3>New here?</h3>
                <p>Sign up and start your journey with us.</p>
                <button className="btn transparent" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
              <img src="log.svg" className="image" alt="login" />
            </div>

            {/* Right Panel */}
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us?</h3>
                <p>If you already have an account, just sign in.</p>
                <button className="btn transparent" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <img src="register.svg" className="image" alt="register" />
            </div>
          </div>
        </div>
      </div>

      {/* OTP Popup Overlay */}
      {showOtp && (
        <div className="otp-overlay" >
          <div className="otp-container">
            <div className="header-form">
              <h4>Enter OTP</h4>
              <p>Check your email or phone for the OTP</p>
            </div>

            {/* OTP image */}
            <img src="otp.svg" alt="OTP verification" className="otp-image" />

            <div className="auth-pin-wrap">
              {otpRefs.map((ref, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="code-input"
                  ref={ref}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                />
              ))}
            </div>
            <div className="btn-wrap">
              <button onClick={handleVerfiyOtp}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
