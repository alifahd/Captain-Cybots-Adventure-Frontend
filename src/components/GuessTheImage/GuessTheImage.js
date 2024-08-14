import React, { useState } from "react";
import img from "../../images/Login_Signup.png"
import axios from 'axios';
import { HowToPlayText, QuestionContainer, BackgroundImg, Line, QuestionTypeText, ErrorContainer, Error,SubmitBtn, Wrapper, QuestionImg } from "./GuessTheImageElements";
import RICIBs from "react-individual-character-input-boxes";
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import { useNavigate } from 'react-router-dom';

function GuessTheImage(props) {
    const navigate = useNavigate();
    /* Unpack props */
    const planet = props.planet;
    const questionNumber = props.questionNumber;
    const numChars = parseInt(props.numChars);

    const headers = {
        //'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }

    const [outputString, setOutputString] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const [lastAnswer, setLastAnswer] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [starsAchieved, setStarsAchieved] = useState(3);

    const state = {
        amount: numChars,
        regEx: RegExp('^[a-zA-Z0-9_.-]*$')
    }

    const handleOutputString = (string) => {
        setOutputString(string);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(outputString.length);
        console.log(numChars);
        if (outputString.length === numChars) {
            if (outputString === lastAnswer) {
                setErrorMsg("No change to answer. Please retry with a new answer.");
                setShowError(true);
            } else {
                setLastAnswer(outputString);
                const answer = {
                    answers: [outputString]
                }
                axios.post(('http://localhost:8080/api/v0/questions?planet='+planet+'&questionNumber='+questionNumber), answer, {
                    headers: headers
                })
                    .then((res) => {
                        if (res.data.correct == true) {
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
            }
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
            <div>
            <QuestionContainer>
                <div>
                <QuestionTypeText>Question {questionNumber}: Guess The Image</QuestionTypeText>
                <HowToPlayText>Describe the picture below</HowToPlayText>
                <Line width={"100%"}/>
                </div>
                <div>
                {props.filename && <QuestionImg src={require(`../../images/${props.filename}`)} alt="LOADING" />}
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
                    </ErrorContainer>
                    </div>
                    <div>
                    <SubmitBtn type="submit">Submit</SubmitBtn>
                    </div>
                </form>
            </QuestionContainer>
            </div>
        </BackgroundImg>
    );
}

export default GuessTheImage;