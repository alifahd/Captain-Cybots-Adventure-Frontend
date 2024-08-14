import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home/Home.js";
import SignUp from "./pages/SignUp/SignUp.js";
import SignIn from "./pages/SignIn/SignIn.js";
import Worlds from "./pages/Worlds/Worlds.js";
import Menu from "./pages/Menu/Menu.js";
import Customization from './pages/Customization/Customization.js';
import Planet from './components/Planet/Planet';
import Leaderboard from './pages/Leaderboard/Leaderboard.js';

// Planet Images
import EarthImg from "./images/Earth.png";
import MarsImg from "./images/Mars.png";
import NeptuneImg from "./images/Neptune.png";
import JupiterImg from "./images/Jupiter.png";

// Dialogue
import EarthLevel1 from './constants/EarthSpeech/EarthLevel1';
import EarthLevel2 from './constants/EarthSpeech/EarthLevel2';
import EarthLevel3 from './constants/EarthSpeech/EarthLevel3';
import EarthLevel4 from './constants/EarthSpeech/EarthLevel4';
import EarthQuizIntro from './constants/EarthSpeech/EarthQuizIntro';
import EarthQuizOutro from './constants/EarthSpeech/EarthQuizOutro';
import MarsLevel1 from './constants/MarsSpeech/MarsLevel1';
import MarsLevel2 from './constants/MarsSpeech/MarsLevel2';
import MarsLevel3 from './constants/MarsSpeech/MarsLevel3';
import MarsLevel4 from './constants/MarsSpeech/MarsLevel4';
import MarsQuizIntro from './constants/MarsSpeech/MarsQuizIntro';
import MarsQuizOutro from './constants/MarsSpeech/MarsQuizOutro';
import NeptuneLevel1 from './constants/NeptuneSpeech/NeptuneLevel1';
import NeptuneLevel2 from './constants/NeptuneSpeech/NeptuneLevel2';
import NeptuneLevel3 from './constants/NeptuneSpeech/NeptuneLevel3';
import NeptuneLevel4 from './constants/NeptuneSpeech/NeptuneLevel4';
import NeptuneQuizIntro from './constants/NeptuneSpeech/NeptuneQuizIntro';
import NeptuneQuizOutro from './constants/NeptuneSpeech/NeptuneQuizOutro';
import JupiterLevel1 from './constants/JupiterSpeech/JupiterLevel1';
import JupiterLevel2 from './constants/JupiterSpeech/JupiterLevel2';
import JupiterLevel3 from './constants/JupiterSpeech/JupiterLevel3';
import JupiterLevel4 from './constants/JupiterSpeech/JupiterLevel4';
import JupiterQuizIntro from './constants/JupiterSpeech/JupiterQuizIntro';
import JupiterQuizOutro from './constants/JupiterSpeech/JupiterQuizOutro';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="*" exact element={<SignIn />} />
            <Route path="/" exact element={<Home/>} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/signin" exact element={<SignIn/>} />
            <Route path="/leaderboard" exact element={<Leaderboard index='1'/>} />
            {localStorage.getItem("username") && 
            <>
                <Route path="/menu" exact element={<Menu />} />
                <Route path="/worlds" exact element={<Worlds />} />
                <Route path="/earth/*" element={<Planet planet={"EARTH"} firstLevelMsgs={EarthLevel1} secondLevelMsgs={EarthLevel2} thirdLevelMsgs={EarthLevel3} fourthLevelMsgs={EarthLevel4} quizIntroMsgs={EarthQuizIntro} quizOutroMsgs={EarthQuizOutro} img={EarthImg} />} />
                <Route path="/mars/*" element={<Planet planet={"MARS"} firstLevelMsgs={MarsLevel1} secondLevelMsgs={MarsLevel2} thirdLevelMsgs={MarsLevel3} fourthLevelMsgs={MarsLevel4} quizIntroMsgs={MarsQuizIntro} quizOutroMsgs={MarsQuizOutro} img={MarsImg} />} />
                <Route path="/neptune/*" element={<Planet planet={"NEPTUNE"} firstLevelMsgs={NeptuneLevel1} secondLevelMsgs={NeptuneLevel2} thirdLevelMsgs={NeptuneLevel3} fourthLevelMsgs={NeptuneLevel4} quizIntroMsgs={NeptuneQuizIntro} quizOutroMsgs={NeptuneQuizOutro} img={NeptuneImg} />} />
                <Route path="/jupiter/*" element={<Planet planet={"JUPITER"} firstLevelMsgs={JupiterLevel1} secondLevelMsgs={JupiterLevel2} thirdLevelMsgs={JupiterLevel3} fourthLevelMsgs={JupiterLevel4} quizIntroMsgs={JupiterQuizIntro} quizOutroMsgs={JupiterQuizOutro} img={JupiterImg} />} />
                <Route path="/customization" exact element={<Customization />} />
            </>}
        </Routes>
    </Router>
  );
}

export default App;