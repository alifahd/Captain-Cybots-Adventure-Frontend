import React, { useEffect, useState } from "react";
import { BackgroundImg, Line, LeaderboardContainer, TitleContainer, LeaderboardText, Row, Column, BackArrowContainer, ForwardArrowContainer } from "./LeaderboardElements.js";
import img from "../../images/Login_Signup.png"
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import BackArrow from '@mui/icons-material/ArrowBackIos';
import ForwardArrow from '@mui/icons-material/ArrowForwardIos';

function Leaderboard() {
    const [isLoading, setLoading] = useState(true);
    const [leaderboardInfo, setLeaderboardInfo] = useState();
    const [index, setIndex] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v0/users/leaderboard?pageNumber=' + index + '&usersPerPage=8',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
                }
            }
        )
            .then((res) => {
                setLeaderboardInfo(res.data.entries);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setIndex(1);
            });
    }, [index]);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    } else {
        if (leaderboardInfo[leaderboardInfo.length - 1].username === localStorage.getItem("username") && leaderboardInfo[leaderboardInfo.length - 1].position < leaderboardInfo[0].position) {
            leaderboardInfo.unshift(leaderboardInfo.pop())
        }
    }

    const incrementIndex = () => {
        setIndex(index + 1);

    }
    const decrementIndex = () => {
        if (index === 1) {
            setIndex(1);
        } else {
            setIndex(index - 1);
        }
    }


    return (
        <BackgroundImg img={img} >
            <Link to="/menu">
                <HomeIcon className="buttonClick" style={{ color: 'white', fontSize: '5vw', paddingLeft: '1%', paddingTop: '0.5%' }} />
            </Link>
            {index > 1 ?
                <BackArrowContainer>
                    <BackArrow onClick={decrementIndex} className="buttonClick" style={{ color: 'white', fontSize: '7vw' }} />
                </BackArrowContainer> : null
            }
            <TitleContainer>
                <LeaderboardText>LEADERBOARD</LeaderboardText>
                <Line />
            </TitleContainer>
            {leaderboardInfo.length === 8 ?
                <ForwardArrowContainer>
                    <ForwardArrow onClick={incrementIndex} className="buttonClick" style={{ color: 'white', fontSize: '7vw' }} />
                </ForwardArrowContainer>
                : null}
            <LeaderboardContainer>
                <Row>
                    <Column style={{ paddingRight: "12vw" }}><u>Position</u></Column>
                    <Column><u>Username</u></Column>
                    <Column style={{ paddingLeft: "12vw" }}><u>Stars</u></Column>
                </Row>
                <ul style={{ color: "white", listStyle: "none" }}>
                    {leaderboardInfo.map(player =>
                        <Row key={player.username} style={player.username === localStorage.getItem("username") ? { backgroundColor: '#c548ff', borderRadius: '1vw' } : {}}>
                            <Column style={{ paddingRight: "12vw" }}>{player.position}</Column>
                            <Column>{player.username}</Column>
                            <Column style={{ paddingLeft: "12vw" }}>{player.stars}</Column>
                        </Row>)}
                </ul>
            </LeaderboardContainer>
        </BackgroundImg>
    );
}

export default Leaderboard;