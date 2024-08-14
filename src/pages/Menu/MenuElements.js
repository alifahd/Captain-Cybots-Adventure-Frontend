import styled from "styled-components";

export const TitleContainer = styled.div`
    position: absolute;
    top: 14%;
    left: 50%;
    width: 65%;
    height: 17%;
    transform: translate(-50%, -50%);
    background: #000A;
    align-items: center;
    text-align: center;
    margin-top: 4%;
    padding: 2% 3% 2% 3%;
    border: 0.2vw solid white;
    border-radius: 3vw;
`

export const MenuText = styled.h1`
    margin-bottom: 1%;
    color: #fff;
    font-weight: 600;
    height: 6vh;
    line-height: 6vh;
    font-size: 6vh;
    text-align: center;
`
export const NameContainer = styled.div`
    position: absolute;
    top: 8%;
    left: 50%;
    width: 70%;
    height: 8%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
`

export const NameText = styled.div`
    color: #fff;
    font-size: 3vh;
    font-weight: 600;
    text-align: center;
    margin-top: 1%;
    margin-left: 1%;
`

export const NameDescription = styled.div`
    display: flex;
    justify-content: center;
`

export const ButtonsContainer = styled.div`
    position: absolute;
    top: 57%;
    left: 50%;
    width: 35%;
    height: 30vw;
    line-height: 10vh;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
    margin-top: 4%;
`

export const MenuBtn = styled.button`
    width: 100%;
    margin: 3.5% 0;
    height: 10vh;
    line-height: 10vh;
    font-size: 6vh;
    font-weight: 600;
    text-shadow: 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black;
    border-radius: 10px c548ff;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #010606;
        text-shadow: none;
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