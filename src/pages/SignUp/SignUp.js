import React, { useState } from "react";
import {BackgroundImg, Line, SignUpContainer, SignUpText, SignUpInput, SignUpBtn, InputDiv, SignInStatement, SignInToggle, Error, ErrorContainer} from "./SignUpElements";
import img from "../../images/Login_Signup.png"
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const emailHandler = (event) => {
        setEnteredEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (enteredPassword.localeCompare(enteredConfirmPassword) === 0) {
            const signUpUser = {
                username: enteredUsername,
                email: enteredEmail,
                password: enteredPassword
            }
            axios.post('http://localhost:8080/api/v0/users', signUpUser)
                .then(() => {
                    setShowError(false);
                    setEnteredUsername("");
                    setEnteredEmail("");
                    setEnteredPassword("");
                    setConfirmPassword("");
                    navigate("/signin");
                }).catch(err => {
                    const msg = err.response.data;
                    if (msg.localeCompare("email already exists") === 0) {
                        setErrorMsg(msg);
                        setShowError(true);
                    } else if (msg.localeCompare("username already exists") === 0) {
                        setErrorMsg(msg);
                        setShowError(true);
                    }
                    console.log(err);
                    setEnteredUsername("");
                    setEnteredEmail("");
                    setEnteredPassword("");
                    setConfirmPassword("");
                });
        } else {
            setErrorMsg("Passwords do not match. Try Again.");
            setEnteredPassword("");
            setConfirmPassword("");
            setShowError(true);
        }
    }

    return (
        <BackgroundImg img={img} >
            <SignUpContainer>
                <SignUpText>SIGN UP</SignUpText>
                <Line width={"100%"}/>
                <form onSubmit={submitHandler}>
                    <InputDiv>
                        <SignUpInput type="text" placeholder="USERNAME" value={enteredUsername} onChange={usernameHandler} />
                        <PersonIcon style={{position: "absolute", top: "0px", left: "5px", width:"8%", height: "100%"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="email" placeholder="EMAIL" value={enteredEmail} onChange={emailHandler} />
                        <MailIcon style={{position: "absolute", top: "0px", left: "5px", width:"8%", height: "100%"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="password" placeholder="PASSWORD" value={enteredPassword} onChange={passwordHandler} />
                        <LockIcon style={{position: "absolute", top: "0px", left: "5px", width:"8%", height: "100%"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="password" placeholder="CONFIRM PASSWORD" value={enteredConfirmPassword} onChange={confirmPasswordHandler} />
                        <LockIcon style={{position: "absolute", top: "0px", left: "5px", width:"8%", height: "100%"}} />
                    </InputDiv>
                    <ErrorContainer>
                        {showError && <Error>{errorMsg}</Error>}
                    </ErrorContainer>
                    <SignUpBtn type="submit">REGISTER</SignUpBtn>
                    <SignInStatement>ALREADY HAVE AN ACCOUNT?<SignInToggle to="/signin">SIGN IN</SignInToggle></SignInStatement>
                </form>
            </SignUpContainer>
        </BackgroundImg>
    );
}

export default SignUp;