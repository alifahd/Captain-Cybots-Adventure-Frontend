import styled from "styled-components";

export const QuestionContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    width: 45vw;
    height: 30vw;
    transform: translate(-50%, -50%);
    border-radius: 1.563vw;
    background: #000A;
    align-items: center;
    text-align: center;
    margin-top: 4%;
    padding: 2% 3% 38% 3%;
    border: 3px solid white;
`

export const QuestionTypeText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 800;
    font-size: 1.5vw;
`

export const HowToPlayText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 400;
`

export const ScrmabledWordText = styled.h1`
    padding-bottom: 10%;
    padding-top: 10%;
    color: #fff;
    font-weight: 800;
    font-size: 2.604vw;
`

export const InputDiv = styled.div`
    position: relative; 
    width: 100%;
`

export const SubmitBtn = styled.button`
    margin-bottom: 0px;
    padding: 0.625vw 2.604vw;
    width: 60%;
    display: inline-block;
    font-size: 0.938vw;
    border-radius: 0.208vw;
    background: #c548ff;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const Line = styled.hr`
    background-color: #c548ff;
    margin: auto; 
    width: ${(props) => props.width};
    height: 0.260vw;
    border: 0.1px solid black;
`

export const BackgroundImg = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.img});
    background-size: cover;
`

export const QuestionImg = styled.img`
    src: ${props => props.img};
    padding-top: 1.042vw;
`

export const Error = styled.p`
    color: red;
    font-size: 0.625vw;
`

export const ErrorContainer = styled.div`
    padding-top: 3.5%;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-bottom: 3.5%;
`

export const Wrapper = styled.div`
  margin: auto;
  padding: 0.781vw;
  text-align: center;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial sans-serif;
  color: white;
  width: 100%;
  text-align: center;
  input:focus, textarea:focus, select:focus{
    outline: none;
  }
`