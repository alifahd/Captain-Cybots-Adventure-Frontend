import styled from "styled-components";

export const QuizTitle = styled.h1`
    color: #fff;
    font-weight: 800;
    font-size: 2.627vw;
    padding-bottom: 0.677vw;
`

export const QuestionNumber = styled.h2`
    color: #fff;
    font-weight: 600;
    font-size: 1.2vw;
    padding-top: 0.677vw;
`

export const QuestionText = styled.h2`
    color: #c548ff;
    font-weight: 400;
    font-size: 1.2vw;
    padding-bottom: 0.677vw;
`

export const QuizContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 63.058vw;
    height: 37vw;
    transform: translate(-50%, -50%);
    border-radius: 1.576vw;
    background: #000A;
    align-items: center;
    text-align: center;
    padding: 2% 3% 0% 3%;
    border: 0.2vw solid white;
`

export const QuizCard = styled.div`
    margin: 0 auto;
    width: 80%;
    padding: 1.302vw;
    color: white;
`

export const MCOption = styled.button`
    min-width: 100%;
    height: 3vw;
    margin: 1% 0;
    white-space: nowrap;
    font-size: 0.833vw;
    background: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
`

export const SubmitBtn = styled.button`
    width: 40%;
    height: 3vw;
    margin: 4% 0;
    font-size: 2.5vh;
    border-radius: 4px;
    background: #00D100;
    color: #000;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-weight: 800;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #00FF00;
        color: #010606;
    }
`

export const QuizScoreContainer = styled.div`
    margin: 0 auto;
    width: 70%;
    height: 50%;
    margin-top: 4.948vw;
    background-color: #979797;
    padding: 0.833vw;
    border-radius: 0.833vw;
    color: white;
`

export const ContinueBtn = styled.button`
    background-color: #c548ff;
    border: none;
    color: white;
    padding: 0.833vw 1.250vw;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    border-radius: 0.417vw;
    cursor: pointer;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const QuizScoreText = styled.h1`
    font-weight: 800;
    font-size: 2vw;
    padding: 0.677vw;
`

export const QuizScore = styled.h2`
    font-weight: 400;
    font-size: 2vw;
    padding-top: 0.677vw;
    padding-bottom: 1.354vw;
`