import './Footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer1'>
        <NavLink className='about' to='/about'>
          Sobre nosotros
        </NavLink>

        <NavLink className='where' to='/where'>
          Dónde estamos
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
