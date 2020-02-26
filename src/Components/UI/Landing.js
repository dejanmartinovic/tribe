import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { compose } from 'redux'


import NavComponent from './NavComponent'



class Landing extends Component {
    render() {
        const {projects, auth, profile, innerprojects, comments, notifications} = this.props;
        return (
            <>
            <NavComponent notifications={notifications} comments={comments} innerprojects={innerprojects} projects={projects} auth={auth} profile={profile}/>
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>HomePage</h1>
                    <p>Stuff explaining the app here</p>
                    <a href="/signup" className="default-button">Sign Up</a>
                </div>
            </div>
        </div>
        </>
        )    
    }
    
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        innerprojects: state.firestore.ordered.innerprojects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        notifications: state.firestore.ordered.notifications,
        organisations: state.firestore.ordered.organisations,
        comments: state.firestore.ordered.comments,
    }
}

export default compose(
connect(mapStateToProps),
firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'comments', orderBy: ['createdAt', 'desc']},
    { collection: 'innerprojects', orderBy: ['createdAt', 'desc']},
    { collection: 'organisations', orderBy: ['time', 'desc'] },
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
    ])
    )(Landing)

