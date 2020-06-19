import React from 'react';
import './Header.scss';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import { AppState } from '../redux/store';
import { connect } from 'react-redux';

type Props = LinkStateProps
function HeaderComponent({title}: Props) {
   return (
      <div className="header">
         <div className="logo-cont">
            logo
         </div>
         <div className="nav-cont">
            {title}
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

interface LinkStateProps {
   title?: string | null
}

const mapStateToProps = (
   state: AppState,
   ownProps: {}
 ): LinkStateProps => ({
   title: state.navigation.main_title
 });

let Header = connect(
   mapStateToProps,
   null
 )(HeaderComponent);
  
export default Header;
  