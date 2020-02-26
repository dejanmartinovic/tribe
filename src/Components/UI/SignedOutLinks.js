import React from 'react'
import {Link} from 'react-router-dom'
import mySvg from "../../assets/btn-splash.svg";

const SignedOutLinks = () => {

    var linkStyle = {
        backgroundImage: `url(${mySvg})`,
        width: 'auto',
        padding:'23px',
        paddingLeft: '30px',
        paddingRight: '30px',
        color: '#fff',
        backgroundRepeat: 'no-repeat'
      };

    return (
        <>
        <li className="nav-link">
            Welcome
        </li>
        <li className="nav-link">
            How it works
        </li>
        <li className="nav-link">
            Pricing
        </li>
        <li className="nav-link">
             <Link to='/signup'>Start</Link>
        </li>
        <li className="nav-link">

             <Link style={linkStyle} to='/signup' className="btn-splashback">Add Your Tribe!</Link>
        </li>
       
        </>
    )
    
}


export default SignedOutLinks