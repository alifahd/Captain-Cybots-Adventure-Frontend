import styled from "styled-components";

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

export const TitleText = styled.h1`
    margin-bottom: 1%;
    color: #fff;
    font-weight: 600;
    height: 7vh;
    line-height: 7vh;
    font-size: 7vh;
    text-align: center;
`
export const ShopContainer = styled.div`
    position: absolute;
    top: 51%;
    left: 50%;
    width: 95%;
    height: 77%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
    margin-top: 4%;
`

export const ShieldContainer = styled.div`
    position: absolute;
    top: 30%;
    left: 72%;
    width: 35%;
    height: 80%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
    margin-top: 4%;
    padding-top: 1.5%;
`

export const BackArrowContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 55%;
    width: 10%;
    height: 15%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
`

export const ForwardArrowContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 89.5%;
    width: 10%;
    height: 15%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
`

export const EquipButton = styled.button`
    position: absolute;
    top: 89%;
    left: 72%;
    width: 15%;
    height: 8vh;
    line-height: 8vh;
    font-size: 4vh;
    font-weight: 600;
    text-shadow: 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    background-color:#c548ff;
    transform: translate(-50%, -50%);
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #010606;
        text-shadow: none;
    }
    &:disabled {
        display: none;
    }
`

export const Line = styled.hr`
    background-color: #c548ff;
    margin: auto; 
    width: ${(props) => props.width};
    height: 7%;
    border: 0.1px solid black;
`

export const BackgroundImg = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.img});
    background-size: cover;
`