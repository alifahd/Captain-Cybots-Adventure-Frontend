import React, { useState, useEffect } from "react";
import img from "../../images/Login_Signup.png"
import { BackgroundImg} from "../Crossword/CrosswordElements";
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QuizContainer, QuizTitle, QuizCard, QuestionText, QuestionNumber, MCOption, SubmitBtn, QuizScoreContainer, ContinueBtn, QuizScoreText, QuizScore } from "./QuizElements";
import { Line } from "../../pages/SignIn/SignInElements";
import axios from 'axios';

function Quiz(props) {
  let purple = "#c548ff";
  let white = "#fff";

  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [optionClicked, setOptionClicked] = useState({answer: "", questionNumber: -1});
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const navigate = useNavigate();

  const headers = {
    //'Content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }

  useEffect(() => {
    if (showResults) {
        const answers = {
            answers: selectedAnswers
        }
        axios.post(('http://localhost:8080/api/v0/quizzes?planet='+props.planet), answers, {
            headers: headers
        }).then((res) => {
            setScore(res.data.score);
        }).catch(err => {
            console.log(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults])

  /* A possible answer was clicked */
  const OptionClicked = (option, questionNumber) => {
    setOptionClicked({answer: option, questionNumber: questionNumber});
    console.log(optionClicked);
  };

  const NextQuestion = () => {
    setSelectedAnswers(selectedAnswers => selectedAnswers.concat(optionClicked));

    if (currentQuestion + 1 < props.questions.length) {
      setOptionClicked({answer: "", questionNumber: -1});
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  return (
    <BackgroundImg img={img} >
        <IconButton onClick={() => {navigate("/menu")}}>
            <HomeIcon style={{color: 'white', fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
        </IconButton>

        <QuizContainer>
          <QuizTitle>QUIZ - {props.planet}</QuizTitle>
          <Line width={"100%"} />
          {showResults ? (
              <QuizScoreContainer>
                <CheckCircleIcon style={{color: "#00A300", fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
                <QuizScoreText>QUIZ SCORE</QuizScoreText>
                <QuizScore>
                    {score * props.questions.length / 100} out of {props.questions.length} correct - ({score}%)
                </QuizScore>
                <ContinueBtn onClick={() => {navigate("/"+props.planet+"/speech/6")}}>CONTINUE</ContinueBtn>
              </QuizScoreContainer>
          ) : (
              <QuizCard>
                <QuestionNumber>Question: {currentQuestion + 1}/{props.questions.length}</QuestionNumber>
                <QuestionText>{props.questions[currentQuestion].question}</QuestionText>
                <ul>
                    {props.questions[currentQuestion].options.map((option) => {
                      return (
                            <MCOption
                              key={option} 
                              onClick={() => OptionClicked(option, props.questions[currentQuestion].questionNumber)}
                              style={{backgroundColor: option.localeCompare(optionClicked.answer) === 0 ? purple : white}} > 
                              {option}
                            </MCOption>
                      );
                    })}
                </ul>
                <SubmitBtn onClick={() => NextQuestion()}>SUBMIT</SubmitBtn>
              </QuizCard>
          )}
        </QuizContainer>
    </BackgroundImg>
  );
}

export default Quiz;