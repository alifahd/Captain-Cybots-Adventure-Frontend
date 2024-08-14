import styled from "styled-components";

export const QuestionContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 63.058vw;
    height: 40.988vw;
    transform: translate(-50%, -50%);
    border-radius: 1.576vw;
    background: #000A;
    align-items: center;
    text-align: center;
    padding: 2% 3% 0% 3%;
    border: 0.2vw solid white;
`

export const Rectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding-top: 2%;
`

export const Letter = styled.div`
    font-size: 1.261vw;
    padding: 6% 8%;
    border: 0.2vw solid black;
`

export const Board = styled.table`
    table-layout: fixed;
    width: 28.902vw;
    border-spacing: 0px;
    border-collapse: collapse;
    text-align: center;
    background-color: white;
`

export const QuestionTypeText = styled.h1`
    padding-bottom: 2%;
    color: #fff;
    font-weight: 800;
    font-size: 2.627vw;
`
export const HowToPlayText = styled.h2`
    color: #fff;
    font-size: 1.104vw;
    font-weight: 400;
    padding-bottom: 0.5%;
`

export const WordBank = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-rows: minmax(0, 2.102vw);
    justify-self: center;
    justify-items: center;
    text-align: center;
    align-items: center;
    color: white;
    padding-top: 2%;
    gap: 0.525vw;
`

export const Word = styled.h3`
    font-size: 0.998vw;
    font-weight: 400;
    text-decoration: ${props => props.isFound ? "solid line-through 0.158vw #c548ff" : "none"};
`