import React from 'react';
import './Header.scss';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";

function Header() {
   return (
      <div className="header">
         <div className="logo-cont">
            logo
         </div>
         <div className="nav-cont">
            Developer Associate Certification
         </div>
         <div className="user-buttons">
            <HeaderButton text="Signup" />
         </div>
      </div>
   );
}

interface HeaderButtonProps {text: string}
function HeaderButton({text}:HeaderButtonProps) {

  return (
   <div className="header-button">
      {text}
   </div>
   )
}
  
export default Header;
  