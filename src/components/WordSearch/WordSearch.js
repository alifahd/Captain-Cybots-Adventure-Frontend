/* eslint-disable array-callback-return */
import React, {useState, useEffect} from 'react';
import { BackgroundImg } from '../../pages/SignIn/SignInElements';
import img from "../../images/Login_Signup.png"
import { Line } from '../../pages/SignUp/SignUpElements';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { QuestionContainer, Rectangle, Board, QuestionTypeText, HowToPlayText, WordBank, Word } from './WordSearchElements';
import Letter from './Letter';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import axios from 'axios';

function WordSearch(props) {

    const [wordsFound, updateWordsFound] = useState([]);
    const [wordSelected, setWordSelected] = useState("");
    const [letterSelectedCoordinate, setLetterSelectedCoordinate] = useState({rowIndex: -1, colIndex: -1});
    const [direction, setDirection] = useState("");
    const [lettersInWordSelected, updateLettersInWordSelected] = useState([]);
    const [lettersDisabled, updateLettersDisabled] = useState([]);
    const [startTime, setStartTime] = useState(0);
    const [starsAchieved, setStarsAchieved] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        setStartTime(Math.floor(Date.now() / 1000));
    }, [])

    useEffect(() => {
        // Word has been found
        if (props.wordBank.includes(wordSelected)) {
            let indexOfWord = props.wordBank.indexOf(wordSelected);
            updateWordsFound(wordsFound => wordsFound.concat(indexOfWord));
            setWordSelected("");
            setLetterSelectedCoordinate({rowIndex: -1, colIndex: -1});
            setDirection("");
            updateLettersDisabled(lettersDisabled => lettersDisabled.concat(lettersInWordSelected));
            updateLettersInWordSelected([]);
            console.log(wordsFound);
        }

        // Word has been found but, letters are selected in the opposite order
        let reversedWordSelected =  reverseStr(wordSelected);
        if (props.wordBank.includes(reversedWordSelected)) {
            let indexOfWord = props.wordBank.indexOf(reversedWordSelected);
            updateWordsFound(wordsFound => wordsFound.concat(indexOfWord));
            setWordSelected("");
            setLetterSelectedCoordinate({rowIndex: -1, colIndex: -1});
            setDirection("");
            updateLettersDisabled(lettersDisabled => lettersDisabled.concat(lettersInWordSelected));
            updateLettersInWordSelected([]);
            console.log(wordsFound);
        }

        if (wordsFound.length === props.wordBank.length) {
            wordSearchCompleted();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordSelected])

    const reverseStr = (str) => {
        // empty string
        let reversedStr = "";
        for (let i = str.length - 1; i >= 0; i--) {
            reversedStr += str[i];
        }
        return reversedStr;
    }

    const headers = {
        'Authorization': "Bearer " + localStorage.getItem('access_token')
    }

    const wordSearchCompleted = () => {
        const answer = {
            answers: props.wordBank,
            timeTaken: (Math.floor(Date.now() / 1000) - startTime)
        }
        axios.post(('http://localhost:8080/api/v0/questions?planet='+props.planet+'&questionNumber='+props.questionNumber), answer, {
            headers: headers
        }).then((res) => {
            console.log(res);
            setStarsAchieved(res.data.stars);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <BackgroundImg img={img}>
            <IconButton onClick={() => {navigate("/menu")}}>
                <HomeIcon style={{color: 'white', fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
            </IconButton>
            {wordsFound.length === props.wordBank.length && <SuccessPopup questionNumber={props.questionNumber} starsGained={starsAchieved} redirect={"/" + props.planet + "/levels"} planet={props.planet} />}
            <QuestionContainer>
                <QuestionTypeText>Question {props.questionNumber}: Word Search</QuestionTypeText>
                <HowToPlayText>Find all of the words hidden in the grid! Click on the letters to form a word.</HowToPlayText>
                <Line width={"100%"}/>
                <Rectangle>
                    <Board>
                        <tbody>
                            {props.boardLetters.map((items, rowIndex) => {
                                return (
                                    <tr key={rowIndex}>
                                        {items.map((subItems, colIndex) => {
                                            // TOP ROW
                                            if (rowIndex === 0) {
                                                if (colIndex === 0) {
                                                    // TOP LEFT CORNER -> Neighbours are: boardLetters[0][1] (RIGHT), boardLetters[1][0] (DOWN), boardLetters[1][1] (DOWN-RIGHT)
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: 0, colIndex: 1, direction: "RIGHT"}, {rowIndex: 1, colIndex: 0, direction: "DOWN"}, 
                                                                {rowIndex: 1, colIndex: 1, direction: "DOWN-RIGHT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected}
                                                                direction={direction} setDirection={setDirection} 
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                } else if (colIndex === props.boardLetters.length-1) {
                                                    // TOP RIGHT CORNER -> Neighbours are: boardLetters[0][colIndex-1] (LEFT), boardLetters[1][colIndex] (DOWN), boardLetters[1][colIndex-1] (DOWN-LEFT)
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: 0, colIndex: colIndex-1, direction: "LEFT"}, 
                                                                {rowIndex: 1, colIndex: colIndex, direction: "DOWN"}, {rowIndex: 1, colIndex: colIndex-1, direction: "DOWN-LEFT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected} 
                                                                direction={direction} setDirection={setDirection}
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                } else {
                                                    // MIDDLE TOP ROW -> Neighbours are: 
                                                    // boardLetters[0][colIndex-1] (LEFT), boardLetters[1][colIndex-1] (DOWN-LEFT)
                                                    // boardLetters[1][colIndex] (DOWN), boardLetters[1][colIndex+1] (DOWN-RIGHT), boardLetters[0][colIndex+1] (RIGHT)
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: 0, colIndex: colIndex-1, direction: "LEFT"}, {rowIndex: 1, colIndex: colIndex-1, direction: "DOWN-LEFT"}, 
                                                                {rowIndex: 1, colIndex: colIndex, direction: "DOWN"}, {rowIndex: 1, colIndex: colIndex+1, direction: "DOWN-RIGHT"}, 
                                                                {rowIndex: 0, colIndex: colIndex+1, direction: "RIGHT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected} 
                                                                direction={direction} setDirection={setDirection} 
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                }
                                            } else if (rowIndex === props.boardLetters.length-1) { // BOTTOM ROW
                                                if (colIndex === 0) {
                                                    // BOTTOM LEFT CORNER -> Neighbours are: boardLetters[rowIndex-1][0] (UP), boardLetters[rowIndex][1] (RIGHT), boardLetters[rowIndex-1][1] (UP-RIGHT)
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: rowIndex-1, colIndex: 0, direction: "UP"}, {rowIndex: rowIndex, colIndex: 1, direction: "RIGHT"}, 
                                                                {rowIndex: rowIndex-1, colIndex: 1, direction: "UP-RIGHT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected} 
                                                                direction={direction} setDirection={setDirection}
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                } else if (colIndex === props.boardLetters.length-1) {
                                                    // BOTTOM RIGHT CORNER -> Neighbours are: boardLetters[rowIndex][colIndex-1] (LEFT), boardLetters[rowIndex-1][colIndex] (UP), boardLetters[rowIndex-1][colIndex-1] (UP-LEFT)
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: rowIndex, colIndex: colIndex-1, direction: "LEFT"}, {rowIndex: rowIndex-1, colIndex: colIndex, direction: "UP"},
                                                                {rowIndex: rowIndex-1, colIndex: colIndex-1, direction: "UP-LEFT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected}
                                                                direction={direction} setDirection={setDirection}
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled?.filter(letter => letter?.rowIndex === rowIndex && letter?.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                } else {
                                                    // MIDDLE BOTTOM ROW -> Neighbours are: 
                                                    // boardLetters[rowIndex][colIndex-1] (LEFT), boardLetters[rowIndex-1][colIndex-1] (UP-LEFT)
                                                    // boardLetters[rowIndex-1][colIndex] (UP), boardLetters[rowIndex][colIndex+1] (RIGHT), boardLetters[rowIndex-1][colIndex+1] (UP-RIGHT)
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: rowIndex, colIndex: colIndex-1, direction: "LEFT"}, {rowIndex: rowIndex-1, colIndex: colIndex-1, direction: "UP-LEFT"}, 
                                                                {rowIndex: rowIndex-1, colIndex: colIndex, direction: "UP"}, {rowIndex: rowIndex, colIndex: colIndex+1, direction: "RIGHT"}, 
                                                                {rowIndex: rowIndex-1, colIndex: colIndex+1, direction: "UP-RIGHT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected}
                                                                direction={direction} setDirection={setDirection}
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                }
                                            } else {
                                                if (colIndex === 0) { // FIRST COLUMN
                                                    if (rowIndex !== 0 && rowIndex !== props.boardLetters.length-1) { 
                                                        // LEFT SIDE COLUMN IN BETWEEN CORNERS (not including top-left & bottom-left corners) -> Neighbours are:
                                                        // boardLetters[rowIndex-1][0] (UP), boardLetters[rowIndex-1][1] (UP-RIGHT)
                                                        // boardLetters[rowIndex][1] (RIGHT), boardLetters[rowIndex+1][0] (DOWN), boardLetters[rowIndex+1][1] (DOWN-RIGHT)
                                                        return (
                                                            <Letter key={colIndex} letter={subItems} 
                                                                    coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                    neighbours={[{rowIndex: rowIndex-1, colIndex: 0, direction: "UP"}, {rowIndex: rowIndex-1, colIndex: 1, direction: "UP-RIGHT"}, {rowIndex: rowIndex, colIndex: 1, direction: "RIGHT"}, 
                                                                    {rowIndex: rowIndex+1, colIndex: 0, direction: "DOWN"}, {rowIndex: rowIndex+1, colIndex: 1, direction: "DOWN-RIGHT"}]} 
                                                                    letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                    setWordSelected={setWordSelected} wordSelected={wordSelected}
                                                                    direction={direction} setDirection={setDirection}
                                                                    updateLettersInWordSelected={updateLettersInWordSelected}
                                                                    isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                            />
                                                        )
                                                    }
                                                } else if (colIndex === props.boardLetters.length-1) { // LAST COLUMN
                                                    if (rowIndex !== 0 && rowIndex !== props.boardLetters.length-1) {
                                                        // RIGHT SIDE COLUMN IN BETWEEN CORNERS (not including top-right & bottom-right corners) -> Neighbours are:
                                                        // boardLetters[rowIndex-1][colIndex] (UP), boardLetters[rowIndex-1][colIndex-1] (UP-LEFT)
                                                        // boardLetters[rowIndex][colIndex-1] (LEFT), boardLetters[rowIndex+1][colIndex] (DOWN), boardLetters[rowIndex+1][colIndex-1] (DOWN-LEFT)
                                                        return (
                                                            <Letter key={colIndex} letter={subItems} 
                                                                    coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                    neighbours={[{rowIndex: rowIndex-1, colIndex: colIndex, direction: "UP"}, {rowIndex: rowIndex-1, colIndex: colIndex-1, direction: "UP-LEFT"}, {rowIndex: rowIndex, colIndex: colIndex-1, direction: "LEFT"}, 
                                                                    {rowIndex: rowIndex+1, colIndex: colIndex, direction: "DOWN"}, {rowIndex: rowIndex+1, colIndex: colIndex-1, direction: "DOWN-LEFT"}]} 
                                                                    letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                    setWordSelected={setWordSelected} wordSelected={wordSelected}
                                                                    direction={direction} setDirection={setDirection}
                                                                    updateLettersInWordSelected={updateLettersInWordSelected}
                                                                    isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                            />
                                                        ) 
                                                    }
                                                } else {
                                                    // ALL THE LETTERS INSIDE
                                                    // boardLetters[rowIndex][colIndex-1] (LEFT), boardLetters[rowIndex-1][colIndex-1] (UP-LEFT)
                                                    // boardLetters[rowIndex-1][colIndex] (UP), boardLetters[rowIndex-1][colIndex+1] (UP-RIGHT), boardLetters[rowIndex][colIndex+1] (RIGHT)
                                                    // boardLetters[rowIndex+1][colIndex+1] (DOWN-RIGHT), boardLetters[rowIndex+1][colIndex] (DOWN), boardLetters[rowIndex+1][colIndex-1] (DOWN-LEFT) 
                                                    return (
                                                        <Letter key={colIndex} letter={subItems} 
                                                                coordinate={{rowIndex: rowIndex, colIndex: colIndex}} 
                                                                neighbours={[{rowIndex: rowIndex, colIndex: colIndex-1, direction: "LEFT"}, {rowIndex: rowIndex-1, colIndex: colIndex-1, direction: "UP-LEFT"}, 
                                                                {rowIndex: rowIndex-1, colIndex: colIndex, direction: "UP"}, {rowIndex: rowIndex-1, colIndex: colIndex+1, direction: "UP-RIGHT"}, 
                                                                {rowIndex: rowIndex, colIndex: colIndex+1, direction: "RIGHT"}, {rowIndex: rowIndex+1, colIndex: colIndex+1, direction: "DOWN-RIGHT"}, 
                                                                {rowIndex: rowIndex+1, colIndex: colIndex, direction: "DOWN"}, {rowIndex: rowIndex+1, colIndex: colIndex-1, direction: "DOWN-LEFT"}]} 
                                                                letterSelectedCoordinate={letterSelectedCoordinate} setLetterSelectedCoordinate={setLetterSelectedCoordinate}
                                                                setWordSelected={setWordSelected} wordSelected={wordSelected}
                                                                direction={direction} setDirection={setDirection}
                                                                updateLettersInWordSelected={updateLettersInWordSelected}
                                                                isDisabled={lettersDisabled.filter(letter => letter.rowIndex === rowIndex && letter.colIndex === colIndex).length > 0}
                                                        />
                                                    )
                                                }
                                            }
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Board>
                    <WordBank>
                        {props.wordBank.map((items, index) => {
                                return (
                                    <Word key={index} isFound={wordsFound.includes(index)}>{items}</Word>
                                );
                        })} 
                    </WordBank>
                </Rectangle>
            </QuestionContainer>
        </BackgroundImg>
    );
}

export default WordSearch;