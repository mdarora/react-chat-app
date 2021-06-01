import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import cookies from 'js-cookie';
import spinner from "../images/Spinner-1s-200px-blue.svg";

const Login = () => {

    const history = useHistory();
    if (cookies.get('jwtoken')){
        history.push('/');
    }

    const [loginEmail , setloginEmail] = useState("");
    const [loginpassword , setloginpassword] = useState("");
    const [resText, setResText] = useState('')

    const showPass = (e) =>{
        if(e.target.checked){
            document.getElementById("login-password").setAttribute("type", "text");
        }else{
            document.getElementById("login-password").setAttribute("type", "password");
        }
    }

    const userLogin = async (e) =>{
        e.preventDefault();
        const spinner = document.getElementById('spinner');

        try {
            setResText('');
            spinner.hidden = false;
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   email:  loginEmail,
                   password: loginpassword
                })
            });

            const result = await res.json();
            if (result.message){
                spinner.hidden = true;
                return history.push("/");
            } else if (result.error){
                spinner.hidden = true;
                setResText(result.error);
            }

        } catch (error) {
            console.log('catch : ',error);
            spinner.hidden = true;
            setResText('Something went wrong!');
        }
    };

    return (
    <>
        <section className="login-section">
            <div className="container">
                <div className="login-area">

                    <h4>Login</h4>
                    <div className="login-form-area">
                        <form onSubmit={userLogin} method="post">
                            <div className="input-field">
                                <input type="email" name="login-email" id="login-email" placeholder="Enter E-mail" autoComplete="off" value={loginEmail} onChange={e => setloginEmail(e.target.value)}  />
                            </div>
                            <div className="input-field">
                                <input type="password" name="login-password" id="login-password" placeholder="Enter Password" autoComplete="off" value={loginpassword} onChange={e => setloginpassword(e.target.value)} />
                            </div>
                            <div className="show-forgot-password">
                                <div className="show-pass">
                                    <input type="checkbox" name="show-pass" id="show-pass" onChange={showPass} />
                                    <label htmlFor='show-pass'>Show Password</label>
                                </div>
                                <div className="forgot-pass">
                                    <Link to="/reset-password">Forgot Password ?</Link>
                                </div>
                            </div>
                            <div className="res">
                                <span id="res-text" className='text-danger'>{resText}</span>
                                <img id="spinner" src={spinner} alt="Spinner svg" width="30" hidden/>
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
