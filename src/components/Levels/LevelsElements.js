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

export const LevelSelectionText = styled.h1`
    margin-bottom: 1%;
    color: #fff;
    font-weight: 600;
    height: 7vh;
    line-height: 7vh;
    font-size: 7vh;
    text-align: center;
`
export const LevelsContainer = styled.div`
    position: absolute;
    top: 38%;
    left: 51%;
    width: 90%;
    height: 60%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
    margin-top: 8%;
`

export const Hologram = styled.div`
    float: left;
    height: 60%;
    align-items: center;
    text-align: center;
`

export const LevelText = styled.div`
    color: #fff;
    font-size: 5vh;
    font-weight: 600;
    text-align: center;
`

export const QuizScore = styled.div`
    color: #fff;
    font-size: 5vh;
    font-weight: 600;
    &:disabled {
        display: none;
    }
`

export const LevelDescription = styled.div`
    display: flex;
    justify-content: center;
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