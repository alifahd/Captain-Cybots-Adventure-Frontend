import React, { useState } from "react";
import img from "../../images/Login_Signup.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HowToPlayText, QuestionContainer, BackgroundImg, Line, QuestionTypeText, ErrorContainer, Error, ScrambledWordText,SubmitBtn, Wrapper } from "./WordScrambleElements";
import RICIBs from "react-individual-character-input-boxes";
import { Card } from "@material-ui/core";
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function WordScramble(props) {
    const navigate = useNavigate();
    /* Unpack props */
    const scrambledWord = props.scrambledWord;
    const planet = props.planet;
    const questionNumber = props.questionNumber;

    const headers = {
        //'Content-type': 'application/json',
        'Authorization':  'Bearer ' + localStorage.getItem('access_token')
    }

    const [outputString, setOutputString] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [starsAchieved, setStarsAchieved] = useState(3);
    const state = {
        amount: scrambledWord.length,
        regEx: RegExp('^[a-zA-Z0-9_.-]*$')
    }

    const handleOutputString = (string) => {
        setOutputString(string);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (outputString.length === scrambledWord.length) {
            const answer = {
                answers: [outputString]
            }
            axios.post(('http://localhost:8080/api/v0/questions?planet='+planet+'&questionNumber='+questionNumber), answer, {
                headers: headers
            })
                .then((res) => {
                    console.log(typeof res.data.correct);
                    console.log(res.data.correct === true);
                    if (res.data.correct === true) {
                        setShowError(false);
                        setStarsAchieved(res.data.stars);
                        setIsCompleted(true);
                    } else {
                        setErrorMsg("Incorrect answer. Please try again.");
                        setShowError(true);
                    }
                }).catch(err => {
                    console.log(err)
                });
        } else {
            setErrorMsg("Please enter a character in each of the input boxes");
            setShowError(true);
        }
    }

    return (
        <BackgroundImg img={img} >
            <IconButton onClick={() => {navigate("/menu")}}>
                    <HomeIcon style={{color: 'white', fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
            </IconButton>
            {isCompleted && <SuccessPopup questionNumber={questionNumber} starsGained={starsAchieved} redirect={"/" + props.planet + "/levels"} planet={props.planet} />}
            <Card>
            <div>
            <QuestionContainer>
                <div>
                <QuestionTypeText>Question {questionNumber}: Word Scramble</QuestionTypeText>
                <HowToPlayText>Unscramble the following word</HowToPlayText>
                <Line width={"100%"}/>
                </div>
                <div>
                <ScrambledWordText>{scrambledWord}</ScrambledWordText>
                </div>
                <form onSubmit={submitHandler}>
                    <div>
                    <Wrapper>
                        <RICIBs
                            amount={state.amount}
                            handleOutputString={handleOutputString} 
                            inputRegExp={state.regEx} 
                            key={state.amount}
                        />
                    </Wrapper>
                    </div>
                    <div>
                    <ErrorContainer>
                        {showError && <Error>{errorMsg}</Error>}
                        {!showError && <Error></Error>}
                    </ErrorContainer>
                    </div>
                    <div>
                    <SubmitBtn type="submit">Submit</SubmitBtn>
                    </div>
                </form>

            </QuestionContainer>
            </div>
            </Card>
        </BackgroundImg>
    );
}

export default WordScramble;