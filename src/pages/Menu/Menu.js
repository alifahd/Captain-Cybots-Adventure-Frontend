import { BackgroundImg, Line, TitleContainer, MenuText, MenuBtn, ButtonsContainer, NameContainer, NameText, NameDescription } from "./MenuElements";
import background from "../../images/Standard_Background.png"
import AccountIcon from '@mui/icons-material/AccountCircle';
import './../../App.css';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function Menu() {

    const logout = () => {
        localStorage.clear();
        //window.location.reload(false);
    }

    return (
        <BackgroundImg img={background} >
            <Link to="/signin">
                <LogoutIcon onClick={logout} className="buttonClick" style={{ color: 'white', fontSize: '5vw', paddingLeft: '1%', paddingTop: '0.5%' }} />
            </Link>
            <NameContainer>
                <NameDescription>
                    <AccountIcon style={{ width: "4%", height: "5%", fill: "white" }}></AccountIcon>
                    <NameText>WELCOME {localStorage.getItem("username").toUpperCase()}</NameText>
                </NameDescription>
            </NameContainer>
            <TitleContainer>
                <MenuText>CAPTAIN CYBOT'S ADVENTURE</MenuText>
                <Line />
            </TitleContainer>
            <ButtonsContainer>
                <Link to="/worlds">
                    <MenuBtn style={{ backgroundColor: "#c548ff" }}>START</MenuBtn>
                </Link>
                <Link to="/customization">
                    <MenuBtn style={{ backgroundColor: "#ff1515" }}>CUSTOMIZATION</MenuBtn>
                </Link>
                <Link to="/leaderboard">
                    <MenuBtn style={{ backgroundColor: "#15e1ff" }}>LEADERBOARD</MenuBtn>
                </Link>
                <Link to="/">
                    <MenuBtn style={{ backgroundColor: "#ffe715" }}>ABOUT</MenuBtn>
                </Link>
            </ButtonsContainer>
        </BackgroundImg>
    );
}

export default Menu;
