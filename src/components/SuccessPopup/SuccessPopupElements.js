import styled from "styled-components";

export const StarsImg = styled.img`
    width: 18.392vw;
    padding-bottom: 2%;
`

export const PopUpContainer = styled.div`
    padding: 4% 4%;
    background-color: white; 
    width: 36.784vw;
    margin: auto;
    z-index: 50;
    font-size: 0.946vw;
    font-weight: 800;
    text-align: center;
    border-radius: 1.576vw;
    border: 0.2vw solid black;
`

export const ContinueBtn = styled.button`
    width: 70%;
    height: 3vw;
    margin: 5% 0;
    font-size: 1.314vw;
    border-radius: 0.21vw;
    background: #00D100;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #000;
    }
`