import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import cookies from 'js-cookie';
import spinner from "../images/Spinner-1s-200px-white.svg";

const Register = () => {

    const history = useHistory();

    if (cookies.get('jwtoken')){
        history.push('/');
    }

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
    };

    const showRes = (tagId, txt, addClass, removeClass) => {
        setResText(txt);
        document.getElementById(tagId).classList.add(addClass);
        document.getElementById(tagId).classList.remove(removeClass);
    }

    const regInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setregisterUser({...registerUser, [name] : value});
    }

    const userRegister = async (e) =>{
        e.preventDefault();

        const spinner = document.getElementById('spinner');

        try {
            setResText('');
            spinner.hidden = false;
            const res = await fetch(`/register`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name : registerUser.regName,
                    email : registerUser.regEmail,
                    password : registerUser.regPassword,
                    cpassword : registerUser.regCPassword
                })
            });
            const result = await res.json();

            if (result.message){
                spinner.hidden = true;
                showRes('resText', result.message, 'text-success', 'text-danger');
                setTimeout(() => {
                    document.getElementById('reg-form').hidden = true;
                    document.getElementById('otp-form').hidden = false;
                }, 2000);
            } else if (result.error){
                spinner.hidden = true;
                showRes('resText', result.error, 'text-danger', 'text-success');
            }
        } catch (error) {
            console.log('Catched : ',error);
            spinner.hidden = true;
            showRes('resText', 'Something went wrong!', 'text-danger', 'text-success');
        }
    }

    const matchOtp = async (e) =>{
        e.preventDefault();
        const spinner = document.getElementById('otpSpinner');

        try {
            setResText('');
            spinner.hidden = false;

            const res = await fetch('/otpverification', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({enteredOtp : enteredOtp})
            });
    
            const result = await res.json();
            
            if(result.message){
                spinner.hidden = true;
                showRes('otpResText', result.message, 'text-success', 'text-danger');

                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            } else if (result.error) {
                spinner.hidden = true;
                showRes('otpResText', result.error, 'text-danger', 'text-success');
            }
        } catch (error) {
            console.log(error);
            spinner.hidden = true;
            showRes('otpResText', 'Something went wrong!', 'text-danger', 'text-success');
        }
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
                                    <label htmlFor='show-pass'>Show Password</label>
                                </div>
                            </div>

                            <div className="res text-danger">
                                <span id='resText'>{resText}</span>
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

                            <div className="res text-success">
                                <span id='otpResText'>{resText}</span>
                                <img id="otpSpinner" src={spinner} alt="Spinner svg" width="30" hidden/>
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
