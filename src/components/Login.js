import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    
    const [loginEmail , setloginEmail] = useState("");
    const [loginpassword , setloginpassword] = useState("");

    const showPass = (e) =>{
        if(e.target.checked){
            document.getElementById("login-password").setAttribute("type", "text");
        }else{
            document.getElementById("login-password").setAttribute("type", "password");
        }
    }

    return (
    <>
        <section className="login-section">
            <div className="container">
                <div className="login-area">

                    <h4>Login</h4>
                    <div className="login-form-area">
                        <form method="post">
                            <div className="input-field">
                                <input type="email" name="login-email" id="login-email" placeholder="Enter E-mail" autoComplete="off" value={loginEmail} onChange={e => setloginEmail(e.target.value)}  />
                            </div>
                            <div className="input-field">
                                <input type="password" name="login-password" id="login-password" placeholder="Enter Password" autoComplete="off" value={loginpassword} onChange={e => setloginpassword(e.target.value)} />
                            </div>
                            <div className="show-forgot-password">
                                <div className="show-pass">
                                    <input type="checkbox" name="show-pass" id="show-pass" onChange={(showPass)} />
                                    <span>Show Password</span>
                                </div>
                                <div className="forgot-pass">
                                    <Link to="/reset-password">Forgot Password ?</Link>
                                </div>
                            </div>
                            <div id="response" className="res text-danger">
                                Invalid details
                            </div>
                            <div className="form-btn-container">
                                <button className="form-btn" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="register-link">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </section>  
    </>
    )
}

export default Login
