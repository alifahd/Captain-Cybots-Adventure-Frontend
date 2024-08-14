import styled from "styled-components";


export const QuestionContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    width: 46.875vw;
    height: 26.042vw;
    transform: translate(-50%, -50%);
    border-radius: 1.563vw;
    background: #000A;
    align-items: center;
    text-align: center;
    margin-top: 4%;
    padding: 2% 3% 35% 3%;
    border: 3px solid white;
    display: flex;
    flex-direction: column;
`

export const QuestionTypeText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 800;
    font-size: 2.604vw;
    display: flex;
    flex-direction: row;
`

export const HowToPlayText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 400;
`

export const ScrambledWordText = styled.h1`
    padding-bottom: 40%;
    padding-top: 40%;
    color: #fff;
    font-weight: 800;
    font-size: 2.604vw;
`

export const InputDiv = styled.div`
    position: relative; 
    width: 100%;
`

export const SubmitBtn = styled.button`
    margin-top: 5px;
    padding: 0.625vw 2.604vw;
    width: 100%;
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
    border: 0.005vw solid black;
`

export const BackgroundImg = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.img});
    background-size: cover;
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
  padding-bottom: 3vw;
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