import React, {useState, useEffect} from 'react';
import { BackgroundImg } from '../../pages/SignIn/SignInElements';
import img from "../../images/Standard_Background.png";
import cybotStance1 from "../../images/CybotStance1.png";
import cybotStance2 from "../../images/CybotStance2.png";
import cybotStance3 from "../../images/CybotStance3.png";
import cybotStance4 from "../../images/CybotStance4.png";
import cybotStance5 from "../../images/CybotStance5.png";
import { BottomContainer, CybotStanceImg, MiddleContainer, NextBtn, PlanetImg, RocketShip, TextBubble, TopContainer, WorldLabel} from './SpeechElements';
import { Line } from '../../pages/SignUp/SignUpElements';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import GIF from "../../images/Rocket_Ship.gif";
import axios from 'axios';

function Speech(props) {
    const navigate = useNavigate();
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [equippedIndex, setEquippedIndex] = useState(0);
    const [isLoading, setLoading] = useState(true);

    var shieldImages = [cybotStance1, cybotStance2, cybotStance3, cybotStance4, cybotStance5];

    const handleClick = () => {
        console.log(props.messages);
        if (currentMessageIndex < props.messages.length - 1) {
            setCurrentMessageIndex(currentMessageIndex + 1)
        } else {
            /* TODO: navigate to the lvl 1 of the world */
            setCurrentMessageIndex(0);
            if (props.setIsNewUser !== undefined) {
                props.setIsNewUser(false);
            }
            if (props.redirect !== undefined) {
                navigate(props.redirect);
            }
        }
    };

    return (
        <BackgroundImg img={img}>

            {!props.isNewUser && <TopContainer>
                                    <IconButton onClick={() => {navigate("/menu")}}>
                                        <HomeIcon style={{color: 'white', fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
                                    </IconButton>
                                    <WorldLabel><mark style={{backgroundColor: '#161616', color: 'white'}}>{props.title}</mark></WorldLabel>
                                    <Line width={"25%"}/>
                                </TopContainer>}
            {!props.isNewUser && <MiddleContainer><PlanetImg src={props.planetImg} alt=""></PlanetImg></MiddleContainer>}
            {!props.isNewUser && <BottomContainer>
                                    <CybotStanceImg src={shieldImages[props.shieldImg]} alt=""></CybotStanceImg> 
                                    <TextBubble>
                                        <div>{props.messages[currentMessageIndex]}</div>
                                        <div style={{margin: "auto"}}><NextBtn onClick={handleClick}>NEXT</NextBtn></div>
                                    </TextBubble>
                                </BottomContainer>}

            {props.isNewUser && <IconButton onClick={() => {navigate("/menu")}}>
                                    <HomeIcon style={{color: 'white', fontSize: '3.459vw', paddingLeft: '1%', paddingTop: '0.5%'}} />
                                </IconButton>}
            {props.isNewUser && <MiddleContainer><RocketShip src={GIF} alt=""></RocketShip></MiddleContainer>}
            {props.isNewUser && <BottomContainer style={{marginTop: "3%"}}>
                                    <CybotStanceImg src={shieldImages[props.shieldImg]} alt=""></CybotStanceImg> 
                                    <TextBubble>
                                        <div>{props.messages[currentMessageIndex]}</div>
                                        <div style={{margin: "auto"}}><NextBtn onClick={handleClick}>NEXT</NextBtn></div>
                                    </TextBubble>
                                </BottomContainer>}
            
        </BackgroundImg>
    );
}

export default Speech;