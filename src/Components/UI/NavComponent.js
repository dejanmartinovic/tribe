import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
// import Notifications from './Notifications'
// import SearchMain from './Search/SearchMain'
import { ReactComponent as Logo } from '../../assets/tribe-logo-02-20.svg';
import { ReactComponent as HeaderBg } from '../../assets/header-svg.svg';



class NavComponent extends Component {

    
    render() {
        var navStyle = {
            backgroundImage: `url(${HeaderBg})`
          };
    
    
        const links = this.props.auth.uid && this.props.profile ? <SignedInLinks profile={this.props.profile} /> : <SignedOutLinks />;
        // const notifications = this.props.auth.uid ? <Notifications profile={this.props.profile} notifications={this.props.notifications} /> : null
        //const searchMain = this.props.auth.uid ? <SearchMain comments={this.props.comments} innerprojects={this.props.innerprojects} projects={this.props.projects} profile={this.props.profile}/> 
        //: null

        // const subMenu = this.props.auth.uid ?
        // <div className="sub-nav">
        //         <div className="col-md-12 sub-nav-col">
        //             <div className="back-forward-link">
        //                 {searchMain}
        //             </div>
        //             {/* <input id="searchBar" class="searchbar btn btn-primary" type="text" placeholder="Search..."></input> */}
        //         </div>
              
        //     </div>
        // : null;
        
return (
    <>
    <nav style={navStyle} className="header-nav">
  
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to='/' className='navbar-brand'>
                    <Logo />
                    </Link>
                    {/* {notifications} */}
                    <ul className="nav-links">
                        { links }
                    </ul>
                    <div className="mob-nav-links">
                        <p>Mob nav to be made</p>
                        {/* { links } */}
                    </div>
                </div>
            
            </div>
            
             
             {/* search when logged in */}
            
            </div>
        </nav>
        {/* {subMenu} */}
        </>
         )    
        }
        
    }


    export default NavComponent;
