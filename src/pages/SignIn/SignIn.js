import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {BackgroundImg, Line, SignInContainer, SignInInput, SignInText, InputDiv, SignUpStatement, SignInBtn, SignUpToggle, ErrorContainer, Error, ForgotPassword} from "./SignInElements.js";
import img from "../../images/Login_Signup.png"
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

function SignIn(props) {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const signInUser = {
            username: enteredUsername,
            password: enteredPassword
        }
        axios.post('http://localhost:8080/api/v0/login', signInUser)
            .then((res) => {
                // props.setLoggedInUser(res.data.access_token, res.data.username);
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("username", res.data.username);
                setEnteredUsername("");
                setEnteredPassword("");
                navigate("/menu");
                window.location.reload();
            }).catch(err => {
                console.log(err);
                const msg = err.response.data.error;
                if (msg.localeCompare("The username or password you entered is incorrect") === 0) {
                    setErrorMsg(msg);
                    setShowError(true);
                }
                setEnteredUsername("");
                setEnteredPassword("");
            });
    }

    return (
        <BackgroundImg img={img} >
            <SignInContainer>
                <SignInText>SIGN IN</SignInText>
                <Line width={"100%"}/>
                <form onSubmit={submitHandler}>
                    <InputDiv>
                        <SignInInput type="text" placeholder="USERNAME" value={enteredUsername} onChange={usernameHandler} />
                        <PersonIcon style={{position: "absolute", top: "0px", left: "5px", width:"8%", height: "100%"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignInInput type="password" placeholder="PASSWORD" value={enteredPassword} onChange={passwordHandler} />
                        <LockIcon style={{position: "absolute", top: "0px", left: "5px", width:"8%", height: "100%"}} />
                    </InputDiv>
                    <ErrorContainer>
                        {showError && <Error>{errorMsg}</Error>}
                        <ForgotPassword>FORGOT PASSWORD?</ForgotPassword> 
                    </ErrorContainer>
                    <SignInBtn type="submit">LOGIN</SignInBtn>
                    <SignUpStatement>DON'T HAVE AN ACCOUNT?<SignUpToggle to="/signup">SIGN UP</SignUpToggle></SignUpStatement>
                </form>
            </SignInContainer>
        </BackgroundImg>
    );
}

export default SignIn;