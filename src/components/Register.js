import React, {useState} from 'react';
import {Link} from "react-router-dom";
import spinner from "../images/Spinner-1s-200px-white.svg";

const Register = () => {

    const [registerUser , setregisterUser] = useState({});
    const [enteredOtp, setenteredOtp] = useState('');
    const [resText, setResText] = useState("")

    const showPass = (e) =>{
        if(e.target.checked){
            document.getElementById("register-password").setAttribute("type", "text");
            document.getElementById("register-Cpassword").setAttribute("type", "text");
        }else{
            document.getElementById("register-password").setAttribute("type", "password");
            document.getElementById("register-Cpassword").setAttribute("type", "password");
        }
    }

    const regInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setregisterUser({...registerUser, [name] : value});
    }

    const userRegister = (e) =>{
        e.preventDefault();
        setResText("OTP sent to your Email");
        setTimeout(() => {
            document.getElementById('reg-form').hidden = true;
            document.getElementById('otp-form').hidden = false;
        }, 2000);
    }

    const matchOtp = (e) =>{
        e.preventDefault();
        setResText("Invalid OTP");
    }

    return (
    <>
        <section className="register-section">
            <div className="container">
                <div className="register-area">

                    <h4>Register</h4>
                    <div className="register-form-area">
                        <form id='reg-form' onSubmit={userRegister} method="post" >

                            <div className="input-field">
                                <input type="name" name="regName" id="register-name" placeholder="Enter full name" autoComplete="off" value={registerUser.regName} onChange={regInputs}  required/>
                            </div>
                            <div className="input-field">
                                <input type="email" name="regEmail" id="register-email" placeholder="Enter E-mail" autoComplete="off" value={registerUser.regEmail} onChange={regInputs}  required/>
                            </div>
                            <div className="input-field">
                                <input type="password" name="regPassword" id="register-password" placeholder="Enter Password" autoComplete="off" value={registerUser.regPassword} onChange={regInputs} required/>
                            </div>
                            <div className="input-field">
                                <input type="password" name="regCPassword" id="register-Cpassword" placeholder="Confirm Password" autoComplete="off" value={registerUser.regCPassword} onChange={regInputs} required/>
                            </div>

                            <div className="show-forgot-password">
                                <div className="show-pass">
                                    <input type="checkbox" name="show-pass" id="show-pass" onChange={(showPass)} />
                                    <span>Show Password</span>
                                </div>
                            </div>

                            <div className="res text-danger">
                                <span>{resText}</span>
                                <img id="spinner" src={spinner} alt="Spinner svg" width="30" hidden/>
                            </div>

                            <div className="form-btn-container">
                                <button className="form-btn" type="submit">Get OTP</button>
                            </div>
                        </form>


                        <form id='otp-form' method="post" onSubmit={matchOtp} hidden>
                            <div className="input-field">
                                <input type="number" name="otp" id="otp" placeholder="Enter OTP" min='0' autoComplete="off" value={enteredOtp} onChange={e => setenteredOtp(e.target.value)}  required/>
                            </div>

                            <div className="res text-danger">
                                <span>{resText}</span>
                                <img id="spinner" src={spinner} alt="Spinner svg" width="30" hidden/>
                            </div>

                            <div className="form-btn-container">
                                <button className="form-btn" type="submit">Submit OTP</button>
                            </div>
                        </form>

                    </div>
                    <div className="register-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </section>  
    </>
    )
}

export default Register;
