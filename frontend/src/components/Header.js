import React from "react";
import headerLogo from '../images/logo.svg'
import { Link } from "react-router-dom";


function Header(props) {
  return (
    <>
      <header className="header">
        <img src={headerLogo} alt="логотип" className="logo" />
        <div className="header__control">
          <p className="header__email">{props.email}</p>
          <Link className="header__button"  onClick={props.onClick} to={props.toLink}>{props.nameLink}</Link>
        </div>
      </header>
    </>
  );
}

export default Header;