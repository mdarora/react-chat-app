import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import cookies from 'js-cookie';
import spinner from '../images/Spinner-1s-200px-blue.svg';

const ResetPassword = () => {

    const history = useHistory();
    if (cookies.get('jwtoken')){
        history.goBack()
    }

    const showPass = (e) =>{
        if(e.target.checked){
            document.getElementById("new-password").setAttribute("type", "text");
            document.getElementById("new-cpassword").setAttribute("type", "text");
        }else{
            document.getElementById("new-password").setAttribute("type", "password");
            document.getElementById("new-cpassword").setAttribute("type", "password");
        }
    };

    const showRes = (tagId, txt, addClass, removeClass) =>{
        const tag = document.getElementById(tagId);
        tag.textContent = txt;
        tag.classList.add(addClass);
        tag.classList.remove(removeClass);
    }

    const sendResetOTP = async (e) =>{
        e.preventDefault();
        const resetEmail = e.target[0].value;

        const spinner = document.getElementById('spinner');
        
        try {
            spinner.hidden = false;
            showRes('resText', '', 'text-success', 'text-danger');
            const res = await fetch('/reset-password',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({resetEmail})
            });
            const result = await res.json();

            if(result.message){
                spinner.hidden = true;
                showRes('resText', result.message, 'text-success', 'text-danger');
                setTimeout(() => {
                    document.getElementById('reset-email-form').hidden = true;
                    document.getElementById('reset-pass-form').hidden = false;
                }, 2000);
            } else if(result.error){
                spinner.hidden = true;
                showRes('resText', result.error, 'text-danger', 'text-success');
            }

        } catch (error) {
            console.log(error);
            spinner.hidden = true;
            showRes('resText', 'Something went wrong!', 'text-danger', 'text-success');
        }
    }

    const matchOtpUpdatePass = async (e) =>{
        e.preventDefault();
        const enteredResetOtp = e.target[0].value;
        const newPassword = e.target[1].value;
        const newCPassword = e.target[2].value;

        const otpPassSpinner = document.getElementById('otpPassSpinner');

        try {
            otpPassSpinner.hidden = false;
            showRes('passResText', '', 'text-danger', 'text-success');

            const res = await fetch('/reset-password',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({enteredResetOtp, newPassword, newCPassword})
            });
            const result = await res.json();

            if(result.message){
                otpPassSpinner.hidden = true;
                showRes('passResText', result.message, 'text-success', 'text-danger');
                setTimeout(() => {
                    history.push('/login');
                }, 1000);

            } else if(result.error){
                otpPassSpinner.hidden = true;
                showRes('passResText', result.error, 'text-danger', 'text-success');
            }
            
        } catch (error) {
            console.log(error);
            otpPassSpinner.hidden = true;
            showRes('passResText', 'Something went wrong!', 'text-danger', 'text-success');
        }
        
    }

    return (
    <>
        <section className="reset-section">
            <div className="container">
                <div className="reset-area">

                    <h4>Reset Password</h4>
                    <div className="reset-form-area">

                        <form id='reset-email-form' onSubmit={sendResetOTP} method="post" >

                            <div className="input-field">
                                <input type="email" name="resetEmail" id="reset-email" placeholder="Enter E-mail" required/>
                            </div>

                            <div className="res">
                                <span id='resText'></span>
                                <img id="spinner" src={spinner} alt="Spinner svg" width="30" hidden/>
                            </div>

                            <div className="form-btn-container">
                                <button className="form-btn" type="submit">Get OTP</button>
                            </div>
                        </form>


                        <form id='reset-pass-form' method="post" onSubmit={matchOtpUpdatePass} hidden>
                            <div className="input-field">
                                <input type="number" name="enteredResetOtp" id="otp" placeholder="Enter OTP" min='0' autoComplete="off"  required/>
                            </div>
                            <div className="input-field">
                                <input type="password" name="newPassword" id="new-password" placeholder="New password" autoComplete="off"  required/>
                            </div>
                            <div className="input-field">
                                <input type="password" name="newCPassword" id="new-cpassword" placeholder="Confirm new password" autoComplete="off"  required/>
                            </div>

                            <div className="show-forgot-password">
                                <div className="show-pass">
                                    <input type="checkbox" name="show-pass" id="show-pass" onChange={(showPass)} />
                                    <label htmlFor='show-pass'>Show Password</label>
                                </div>
                            </div>

                            <div className="res">
                                <span id='passResText'></span>
                                <img id="otpPassSpinner" src={spinner} alt="Spinner svg" width="30" hidden/>
                            </div>

                            <div className="form-btn-container">
                                <button className="form-btn" type="submit">Reset</button>
                            </div>
                        </form>

                    </div>
                    <div className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default ResetPassword
