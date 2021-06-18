import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer1">
        <NavLink to="/about">Sobre nosotros</NavLink>
      </div>
    </div>
  );
}

export default Footer;
