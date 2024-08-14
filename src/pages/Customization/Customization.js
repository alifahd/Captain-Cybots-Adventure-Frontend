import React, { useEffect, useState } from "react";
import { BackgroundImg, Line, TitleContainer, TitleText, ShopContainer, ShieldContainer, BackArrowContainer, ForwardArrowContainer, EquipButton } from "./CustomizationElements";
import background from "../../images/Standard_Background.png";
import defaultShieldStand from "../../images/Default_Shield_Stand.png";
import shield1Stand from "../../images/Shield_1_Stand.png";
import shield2Stand from "../../images/Shield_2_Stand.png";
import shield3Stand from "../../images/Shield_3_Stand.png";
import shield4Stand from "../../images/Shield_4_Stand.png";
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import BackArrow from '@mui/icons-material/ArrowBackIos';
import ForwardArrow from '@mui/icons-material/ArrowForwardIos';
import './../../App.css';
import { Link } from 'react-router-dom';
import defaultShield from "../../images/Default_Shield.png";
import shield1 from "../../images/Shield_1.png";
import shield2 from "../../images/Shield_2.png";
import shield3 from "../../images/Shield_3.png";
import shield4 from "../../images/Shield_4.png";
import axios from 'axios';

function Customization() {
    var shieldImages = [defaultShield, shield1, shield2, shield3, shield4];
    var shieldStandImages = [defaultShieldStand, shield1Stand, shield2Stand, shield3Stand, shield4Stand];

    const [index, setIndex] = useState(0);
    const [equippedIndex, setEquippedIndex] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [playerInfo, setPlayerInfo] = useState();

    var shieldLock = [false, true, true, true, true];

    useEffect(() => {
        axios.get('http://localhost:8080/api/v0/users/' + localStorage.getItem("username") + '/cosmetic',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
                }
            }
        )
            .then((res) => {
                setEquippedIndex(res.data.unlockWorld);
            }).catch(err => {
                console.log(err);
            });
            axios.get('http://localhost:8080/api/v0/users/' + localStorage.getItem("username"),
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
                    }
                }
            )
                .then((res) => {
                    setPlayerInfo(res.data.worlds);
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                });
    }, []);

    

    if (isLoading) {
        return <div className="App">Loading...</div>;
    } else {
        playerInfo.forEach((world) => {
            if (world.planet === "EARTH" && world.quizScore !== -1) {
                shieldLock[1] = false;
            } else if (world.planet === "MARS" && world.quizScore !== -1) {
                shieldLock[2] = false;
            } else if (world.planet === "NEPTUNE" && world.quizScore !== -1) {
                shieldLock[3] = false;
            } else if (world.planet === "JUPITER" && world.quizScore !== -1) {
                shieldLock[4] = false;
            }
        });
    }

    const incrementIndex = () => {
        if (index === 4) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }
    const decrementIndex = () => {
        if (index === 0) {
            setIndex(4);
        } else {
            setIndex(index - 1);
        }
    }

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    }

    const body = {
        unlockWorld: index
    }

    const equip = () => {
        setEquippedIndex(index);
        axios.patch('http://localhost:8080/api/v0/users/'+ localStorage.getItem("username") +'/cosmetic', body, {
            headers: headers
        }).then((res) => {
            console.log("Patch success")
        }).catch(err => {
            console.log(err);
        });
        console.log(index);
    }

    return (
        <BackgroundImg img={background} >
            <Link to="/menu">
                <HomeIcon className="buttonClick" style={{ color: 'white', fontSize: '5vw', paddingLeft: '1%', paddingTop: '0.5%' }} />
            </Link>
            <TitleContainer>
                <TitleText>CUSTOMIZATION</TitleText>
                <Line />
            </TitleContainer>
            <ShopContainer>
                <img src={shieldStandImages[equippedIndex]} alt="Default Shield" style={{ float: "left", width: "45%", height: "100%" }} />
                <BackArrowContainer>
                    <BackArrow onClick={decrementIndex} className="buttonClick" style={{ color: 'white', fontSize: '7vw' }} />
                </BackArrowContainer>
                <ShieldContainer>
                    {shieldLock[index] ? <LockIcon className="lockOverlay" style={{ fontSize: '8vw' }} /> : null}
                    <img onClick={equip} src={shieldImages[index]} alt="shield" className={"shieldStyle" + index + " " + (shieldLock[index] ? "black" : "buttonClick floating")} />
                </ShieldContainer>
                <ForwardArrowContainer>
                    <ForwardArrow onClick={incrementIndex} className="buttonClick" style={{ color: 'white', fontSize: '7vw' }} />
                </ForwardArrowContainer>
                <EquipButton disabled={shieldLock[index] || index === equippedIndex} onClick={equip}>EQUIP</EquipButton>
            </ShopContainer>
        </BackgroundImg>
    );
}

export default Customization;