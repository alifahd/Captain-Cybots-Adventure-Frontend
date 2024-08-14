import React, { useEffect, useState } from "react";
import img from "../../images/Login_Signup.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HowToPlayText, QuestionContainer, BackgroundImg, Line, QuestionTypeText, CrosswordContainer } from "./CrosswordElements";
import ReactCrossword from '@jaredreisinger/react-crossword';
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function Crossword(props) {
    const navigate = useNavigate();
    const crosswordBoard = props.board;
    const [isCrosswordCompleted, setIsCrosswordCompleted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [starsAchieved, setStarsAchieved] = useState(3);

    /* Unpack props */
    //const crosswordData = props.crosswordData;
    const planet = props.planet;
    const questionNumber = props.questionNumber;

    useEffect(() => {
        setStartTime(Math.floor(Date.now() / 1000));
    }, [])

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }

    const crosswordCorrectHandler = () => {
        setIsCrosswordCompleted(true);
        const answer = {
            answers: props.answers,
            timeTaken: (Math.floor(Date.now() / 1000) - startTime)
        }
        axios.post(('http://localhost:8080/api/v0/questions?planet='+planet+'&questionNumber='+questionNumber), answer, {
            headers: headers
        })
            .then((res) => {
                console.log(typeof res.data.correct);
                console.log(res.data.correct === true);
                setStarsAchieved(res.data.stars);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <BackgroundImg img={img} >
            <IconButton onClick={() => {navigate("/menu")}}>
                    <HomeIcon style={{color: 'white', fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
            </IconButton>
            {isCrosswordCompleted && <SuccessPopup questionNumber={questionNumber} starsGained={starsAchieved} redirect={"/" + props.planet + "/levels"} planet={props.planet} />}
            <div>
                <QuestionContainer>
                    <QuestionTypeText>Question {questionNumber}: Crossword</QuestionTypeText>
                    <HowToPlayText>Fill the crossword using the hints.</HowToPlayText>
                    <Line width={"100%"}/>
                    <CrosswordContainer>
                        <ReactCrossword onCrosswordCorrect={crosswordCorrectHandler} data={crosswordBoard} theme={{gridBackground:'rgb(0,0,0,0)', numberColor:'rgba(0,0,0,0.7)', focusBackground:'#c548ff', highlightBackground:'#d77aff'}}/>
                    </CrosswordContainer>
                </QuestionContainer>
            </div>
        </BackgroundImg>
    ); 
}

export default Crossword;