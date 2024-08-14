import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WordScramble from '../WordScramble/WordScramble';
import GuessTheImage from '../GuessTheImage/GuessTheImage';
import WordSearch from '../WordSearch/WordSearch';
import Crossword from '../Crossword/Crossword';
import { useLocation } from "react-router-dom";

function Questions(props) {

    const [scrambledWord, setScrambledWord] = useState("");
    const [fileName, setFileName] = useState("");
    const [numChars, setNumChars] = useState("");
    const [boardLetters, setBoardLetters] = useState([['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '' , ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', '']]);
    const [wordBank, setWordBank] = useState([]);
    const [board, setBoard] = useState({
                                        "across": {
                                            "": {
                                                "col": -1,
                                                "answer": "",
                                                "clue": "",
                                                "row": -1
                                            }
                                        },
                                        "down": {
                                            "": {
                                                "col": -1,
                                                "answer": "",
                                                "clue": "",
                                                "row": -1
                                            }
                                        }
                                    });
    const [crosswordAnswers, setCrosswordAnswers] = useState([]);
    const [isWordScramble, setIsWordScramble] = useState(false);
    const [isGuessTheImage, setIsGuessTheImage] = useState(false);
    const [isWordSearch, setIsWordSearch] = useState(false);
    const [isCrossword, setIsCrossword] = useState(false);
    const location = useLocation();                            

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };

    useEffect(() => {
        setIsWordScramble(false);
        setIsGuessTheImage(false);
        setIsWordSearch(false);
        setIsCrossword(false);

        console.log("LOCATION " + JSON.stringify(location));
        let questionNumber = new URLSearchParams(location.search);
        console.log("LOOKING AT SP: " + questionNumber.get("questionNumber"));

        /* Get Question and set fields depending on QuestionType from response */
        axios.get(('http://localhost:8080/api/v0/questions?planet='+props.planet+'&questionNumber='+parseInt(questionNumber.get("questionNumber"))), {
            headers: headers
        }).then((res) => {
            switch (res.data.type) {
                case 'WORD_SCRAMBLE':
                    setScrambledWord(res.data.scrambledWord);
                    console.log("Word: " + scrambledWord);
                    setIsWordScramble(true);
                    break;

                case "GUESS_THE_IMAGE":
                    const newFileName = res.data.filename;
                    console.log(newFileName);
                    setFileName(res.data.filename);
                    const newNumChars = res.data.numChars;
                    console.log(newNumChars);
                    setNumChars(res.data.numChars);
                    setIsGuessTheImage(true);
                    break;

                case "WORD_SEARCH":
                    setBoardLetters(res.data.searchArray);
                    setWordBank(res.data.answers);
                    setIsWordSearch(true);
                    break;

                case 'CROSSWORD':
                    setBoard(res.data.resData);
                    setCrosswordAnswers(res.data.answers);
                    setIsCrossword(true);
                    break;

                default:
                    console.log("REACHED DEFAULT CASE");
                    break;
                
            }
        }).catch(err => {
            console.log(err);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <div>
            {isWordScramble && <WordScramble questionNumber={1} scrambledWord={scrambledWord} planet={props.planet}/> }
            {isGuessTheImage && fileName && <GuessTheImage questionNumber={2} filename={fileName} numChars={numChars} planet={props.planet} />}
            {isWordSearch && <WordSearch planet={props.planet} questionNumber={3} boardLetters={boardLetters} wordBank={wordBank} />}
            {isCrossword && <Crossword questionNumber={4} board={board} answers={crosswordAnswers} planet={props.planet} />}
        </div>
    );
}

export default Questions;