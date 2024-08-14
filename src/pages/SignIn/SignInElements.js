import styled from "styled-components";
import {NavLink as Link} from "react-router-dom";

export const SignInContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 27%;
    height: 28vw;
    transform: translate(-50%, -50%);
    background: #000A;
    align-items: center;
    text-align: center;
    padding: 2% 3% 0% 3%;
    border: 0.2vw solid white;
    border-radius: 5%;
`
export const SignInText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 600;
    font-size: 4.5vh;
`

export const InputDiv = styled.div`
    position: relative; 
    width: 100%;
    height: 2.6vw;
`

export const SignInInput = styled.input`
    height: 2.6vw;
    display: block;
    box-sizing: border-box;
	border: none;
	border-radius: 10px;
	padding: 12px 15px;
    padding-left: 12%;
	margin-top: 10%;
	width: 100%;
    font-size: 2vh;
    
    &:focus {
        outline: 2px solid #c548ff;
    }
`

export const SignInBtn = styled.button`
    width: 100%;
    height: 3vw;
    margin: 8% 0;
    font-size: 2.5vh;
    border-radius: 4px;
    background: #c548ff;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const SignUpStatement = styled.p`
    color: #fff;
    font-weight: bold;
    font-size: 2vh;
`
export const SignUpToggle = styled(Link)`
    padding-left: 2%;
    color: #c548ff;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #fff;
    }
`

export const ForgotPassword = styled.a`
    font-size: 1.7vh;
    float: right;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
`

export const ErrorContainer = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 2.5%;
`

export const Error = styled.p`
    color: red;
    font-size: 12px;
    padding-bottom: 2%;
`
export const Line = styled.hr`
    background-color: #c548ff;
    margin: auto; 
    width: ${(props) => props.width};
    height: 5px;
    border: 0.1px solid black;
`

export const BackgroundImg = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.img});
    background-size: cover;
`