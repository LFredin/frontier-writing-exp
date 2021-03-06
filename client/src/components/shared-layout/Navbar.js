import React from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import {logoutUser} from '../../actions/authActions';

class Navbar extends React.Component{ //choose which to show for logged in /out users
  
  state = {

  }

  onLogoutClick = (e)=>{
    e.preventDefault();
    this.props.logoutUser();
  }; 

  renderLinks(){
    if(this.props.auth.isAuthenticated){
      return(
        <div>
          <ul>
            <li>
              <Link to="/homepage" className=" "> 
                      MY PAGE
              </Link>
            </li>
          </ul>
          <ul className="right-navitem">
            <li> 
              <Link to="/about" className="">
                ABOUT
              </Link>
            </li>
            <li>
              <Link  onClick={(e)=>{ 
                e.preventDefault();
                this.props.logoutUser(); }}  
                to="/" className="sign-out-nav">
                SIGN OUT
              </Link>
            </li>
          </ul>
        </div>
      );
     
    } else{
        return(
          <div>
            <ul>
              <li>
                <Link to="/login" className=" "> 
                        LOG IN
                </Link>
              </li>
              <li>
                <Link to="/register" className=" ">
                      REGISTER
                </Link>
              </li>
            </ul>
            <ul className="right-navitem">
              <li> 
                <Link to="/about" className="">
                  ABOUT
                </Link>
              </li>
            </ul>
          </div>
        
        );
    }
  }
  
  render(){
    return(
      <div className="center">
        <div className="main-navbar">
          <div className="container navbar-content">
              {this.renderLinks()}
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state)=>({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
