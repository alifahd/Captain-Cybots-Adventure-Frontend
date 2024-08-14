import styled from "styled-components";
import {NavLink as Link} from "react-router-dom";

export const SignUpContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    width: 30%;
    height: 36vw;
    transform: translate(-50%, -50%);
    background: #000A;
    align-items: center;
    text-align: center;
    margin-top: 4%;
    padding: 2% 3% 0% 3%;
    border: 0.2vw solid white;
    border-radius: 5%;
`

export const SignUpText = styled.h1`
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

export const SignUpInput = styled.input`
    height: 2.6vw;
    display: block;
    box-sizing: border-box;
	border: none;
	border-radius: 10px;
	padding: 12px 15px;
    padding-left: 12%;
	margin-top: 8%;
	width: 100%;
    font-size: 2vh;
    
    &:focus {
        outline: 2px solid #c548ff;
    }
`

export const SignUpBtn = styled.button`
    width: 100%;
    height: 3vw;
    margin: 5% 0;
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

export const SignInStatement = styled.p`
    color: #fff;
    font-weight: bold;
    font-size: 1.8vh;
`

export const SignInToggle = styled(Link)`
    padding-left: 2%;
    color: #c548ff;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #fff;
    }
`

export const ErrorContainer = styled.div`
    padding-top: 3.5%;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-bottom: 3.5%;
`
export const Error = styled.p`
    color: red;
    font-size: 12px;
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