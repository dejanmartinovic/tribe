import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import MyDetails from './MyDetails'
import MainSidebar from'../UI/MainSidebar'
import OrgSettings from './OrgSettings'
import NavComponent from '../UI/NavComponent'
import { firestoreConnect } from 'react-redux-firebase'
import { compose }  from 'redux'

class MyAccount extends Component {
    state = {
        admin: 'false',
        loaded: 'false'
    };
    
    render() {

        const {auth, profile, projects, comments, innerprojects,notifications} = this.props;
       

        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <>
            <NavComponent notifications={notifications} comments={comments} innerprojects={innerprojects} projects={projects} auth={auth} profile={profile}/>

            <div className="container project-details-container">
                <div className="row">

                    <MainSidebar projects={projects} profile={profile}/>
                    
                    <div className="col-md-9 account-content">
                    <MyDetails />
                    {profile.organisation ? <OrgSettings /> : null}
                    
                    </div>
                </div>
                
            </div>
            </>
            
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        comments: state.firestore.ordered.comments,
        projects: state.firestore.ordered.projects,
        innerprojects: state.firestore.ordered.innerprojects,
        organisations: state.firestore.ordered.organisations,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 5, orderBy: ['time', 'desc']},
    { collection: 'innerprojects', orderBy: ['createdAt', 'desc']},
        { collection: 'comments', orderBy: ['createdAt', 'asc']}
    ])
)(MyAccount)
