import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {Redirect} from 'react-router-dom'
import ListUsers from '../MyAccount/Organisation/ListUsers'

class OrgSettings extends Component {
    
    render() {
        
        const {profile} = this.props;
        // if (profile.isOrg === false || admin === 'false') return <Redirect to='/signin' />

        return (

            <div className="row org-settings-row">
                <div className="col-md-12">
                    <h3>Your Tribe</h3>
                    </div>
                <div className="col-md-12 account-main-content">
                    <p>Tribe Name : {profile.organisation}</p>
                </div>

                <div className="col-md-12 add-user">
                    <h3 className="current-title">Your Tribe Members</h3>
                    <ListUsers  />
                </div>
                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(OrgSettings)
