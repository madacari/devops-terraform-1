import './Header.scss';
import {Button} from "@mui/material";

const Header = () => {
  return (
    <header>
      <nav className="nav-bar">
        <Button href='/' style={{color: 'white'}} variant="text">Accueil</Button>
      </nav>
    </header>
  )
}

export default Header;