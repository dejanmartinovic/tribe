import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../Store/Actions/authActions'

const SignedInLinks = (props) => {
   
    var background = props.profile.avatarURL

        if(!background) {
            background = 'https://static.thenounproject.com/png/4815-200.png'
        }
        

    var profileImage = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
    return (
        <>
        <li className="nav-link">
            <Link to='/dashboard'>Your Projects</Link>
        </li>
        <li className="nav-link">
        <Link to='/myaccount/mydetails'>
            
            <div style={profileImage} className="profile-picture nav-profile">
            </div>
        </Link>
         </li>
        <li className="nav-link">
             <Link onClick={props.signOut} to='/dashboard'>Logout</Link>
        </li>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)