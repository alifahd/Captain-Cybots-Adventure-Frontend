import styled from "styled-components";
import {NavLink as Link} from "react-router-dom";

export const TitleContainer = styled.div`
    position: absolute;
    top: 4%;
    left: 50%;
    width: 48%;
    height: 14%;
    transform: translate(-50%, -50%);
    background: #000A;
    align-items: center;
    text-align: center;
    margin-top: 4%;
    padding: 1% 3% 1% 3%;
    border: 3px solid white;
    border-radius: 10px;
`

export const LeaderboardText = styled.h1`
    margin-bottom: 1%;
    color: #fff;
    font-weight: 600;
    height: 7vh;
    line-height: 7vh;
    font-size: 7vh;
    text-align: center;
`

export const LeaderboardContainer = styled.div`
    position: absolute;
    top: 59%;
    left: 50%;
    width: 90%;
    height: 36vw;
    transform: translate(-50%, -50%);
    background: #000A;
    align-items: center;
    text-align: center;
    padding: 0.5% 3% 0% 3%;
    border: 0.2vw solid white;
    border-radius: 2vw;
`
export const Column = styled.div`
    float: left;
    width: 33.33%;
    padding: 0.7vw 0.5vw 0.5vw 0.5vw;
    color: #fff;
    font-weight: 600;
    font-size: 4vh;
`

export const Row = styled.div`
    content: "";
    display: table;
    clear: both;
    width: 100%;
`

export const BackArrowContainer = styled.div`
    position: absolute;
    top: 12.5%;
    left: 22%;
    width: 10%;
    height: 15%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
`

export const ForwardArrowContainer = styled.div`
    position: absolute;
    top: 12.5%;
    left: 79%;
    width: 10%;
    height: 15%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
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