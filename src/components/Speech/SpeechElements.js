import styled from "styled-components";

export const WorldLabel = styled.h1`
    color: #fff;
    font-weight: 600;
    text-align: center;
    font-size: 2.60vw;
`
export const TopContainer = styled.div`
    display: inline-block;
    width: 100%;
    height: 15%;
`

export const MiddleContainer = styled.div`
    display: flex;
    width: 100%;
    height: 45%;
    margin: auto;
    justify-content: center; 
    align-items: center;
`

export const BottomContainer = styled.div`
    width: 100%;
    height: 37%;
    display: grid;
    grid-template-columns: 35% 65%;
`

export const PlanetImg = styled.img`
    width: 18%; 
`

export const RocketShip = styled.img`
    height: 115%; 
`

export const CybotStanceImg = styled.img`
    width: 45%;
    margin: 0 0 auto auto;
    z-index: 3;
`

export const TextBubble = styled.div`
    width: 80%;
    height: 12vw;
    background: #EAEFF2;
    padding: 1.064vw 3.193vw;
    text-align: center;
    font-weight: 600;
    color: #000;
    margin-top: 1vw;
    margin-left: -3.299vw;
    position: relative;
    font-size: 1.06vw;
    display: grid;
    grid-template-rows: 75% 25%;
` 

export const NextBtn = styled.button`
    padding: 0.638vw 2.66vw;
    font-size: 0.957vw;
    border-radius: 0.212vw;
    background: #1c95c6;
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
