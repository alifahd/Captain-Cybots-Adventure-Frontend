import React, { useEffect, useState } from "react";
import { Character } from "./LetterElements";


function Letter(props) {
  
    const [isLetterSelected, setIsLetterSelected] = useState(false);
    const [isFirstLetterSelected, setIsFirstLetterSelected] = useState(false);
    const [previousLetterSelectedCoordinate, setPreviousLetterSelectedCoordinate] = useState({rowIndex: -1, colIndex: -1});

    useEffect(() => {
        if (isLetterSelected) {
            props.setWordSelected(props.wordSelected + props.letter.toLowerCase())
            props.setLetterSelectedCoordinate(props.coordinate);
            props.updateLettersInWordSelected(lettersInWordSelected => lettersInWordSelected.concat(props.coordinate));
            console.log("IN HERE ", props.wordSelected);
            if (props.wordSelected.length+1 === 2) {
                props.setDirection(findDirection());
            }
        } else {
            const lastIndex = props.wordSelected?.lastIndexOf(props.letter.toLowerCase());
            let word = props.wordSelected?.slice(0, lastIndex) + props.wordSelected?.slice(lastIndex + 1);
            props.setWordSelected(word);
            props.updateLettersInWordSelected(lettersInWordSelected => lettersInWordSelected.filter(letter => {return letter.rowIndex !== props.coordinate.rowIndex && letter.colIndex !== props.coordinate.colIndex}));
            if (isFirstLetterSelected) {
                props.setLetterSelectedCoordinate({rowIndex: -1, colIndex: -1}); // Set to default state
                setIsFirstLetterSelected(false);
            } else {
                props.setLetterSelectedCoordinate(previousLetterSelectedCoordinate); // Set to the previous letter coordinate that was selected
            }
            if (props.wordSelected.length === 2) {
                props.setDirection("");
            }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLetterSelected])

    const handleClick = () => {
        if (!props.isDisabled) {
            // First letter selected
            if (props.letterSelectedCoordinate.rowIndex === -1 && props.letterSelectedCoordinate.colIndex === -1) {
                setIsFirstLetterSelected(true);
                setIsLetterSelected(!isLetterSelected);
            } else if (props.letterSelectedCoordinate.rowIndex === props.coordinate.rowIndex && props.letterSelectedCoordinate.colIndex === props.coordinate.colIndex) { // Click on itself
                setIsLetterSelected(!isLetterSelected);
            } else {
                console.log("DIRECTION FROM PROPS: " + props.direction)
                if (props.direction !== "" && props.wordSelected.length >= 2) {
                    // if two or more letters have been selected, ensure this letter is a neighbour with the opposite of props.direction
                    if (props.neighbours.filter(neighbour => 
                        neighbour.rowIndex === props.letterSelectedCoordinate.rowIndex 
                        && neighbour.colIndex === props.letterSelectedCoordinate.colIndex 
                        && neighbour.direction === findOppositeDirection(props.direction)).length > 0) {
                            setIsFirstLetterSelected(false);
                            setPreviousLetterSelectedCoordinate(props.letterSelectedCoordinate)
                            setIsLetterSelected(!isLetterSelected);
                    } 
                } else if (props.direction === "" && props.wordSelected.length < 2) { // two letters have not been selected yet, we dont care about direction, just care about neighbours
                    if (props.neighbours.filter(neighbour => 
                        neighbour.rowIndex === props.letterSelectedCoordinate.rowIndex && neighbour.colIndex === props.letterSelectedCoordinate.colIndex).length > 0) {
                            setIsFirstLetterSelected(false);
                            setPreviousLetterSelectedCoordinate(props.letterSelectedCoordinate)
                            setIsLetterSelected(!isLetterSelected);
                    }  
                }
            }
        }
    };

    const findDirection = () => {
        let rowIndexDifference = (props.coordinate.rowIndex - props.letterSelectedCoordinate.rowIndex);
        let colIndexDifference = (props.coordinate.colIndex - props.letterSelectedCoordinate.colIndex);

        if (rowIndexDifference === -1 && colIndexDifference === 0) {
            return "UP";
        } else if (rowIndexDifference === 1 && colIndexDifference === 0) {
            return "DOWN";
        } else if (rowIndexDifference === 0 && colIndexDifference === -1) {
            return "LEFT";
        } else if (rowIndexDifference === 0 && colIndexDifference === 1) {
            return "RIGHT";
        } else if (rowIndexDifference === -1 && colIndexDifference === -1) {
            return "UP-LEFT";
        } else if (rowIndexDifference === -1 && colIndexDifference === 1) {
            return "UP-RIGHT";
        } else if (rowIndexDifference === 1 && colIndexDifference === -1) {
            return "DOWN-LEFT";
        } else if (rowIndexDifference === 1 && colIndexDifference === 1) {
            return "DOWN-RIGHT";
        }
    }

    const findOppositeDirection = (direction) => {
        switch (direction) {
            case "UP":
                return "DOWN"
            case "DOWN":
                return "UP";
            case "LEFT":
                return "RIGHT";
            case "RIGHT":
                return "LEFT";
            case "UP-LEFT":
                return "DOWN-RIGHT";
            case "DOWN-RIGHT":
                return "UP-LEFT";
            case "UP-RIGHT":
                return "DOWN-LEFT";
            case "DOWN-LEFT":
                return "UP-RIGHT";
            default:
                return "";
          }
    }

    const determineColor = () => {
        if (isLetterSelected && props.isDisabled) {
            return "#00FF00";
        } else if (isLetterSelected && !props.isDisabled) {
            return "#c548ff";
        } else {
            return "";
        }
    }

    return (
        <th style={{backgroundColor: determineColor()}} onClick={handleClick}>
            <Character>{props.letter}</Character>
        </th>
    );
}
export default Letter;