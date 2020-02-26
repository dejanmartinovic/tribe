import React, { Component } from 'react'
import SignInOrg from './SignInOrg'
import SignInSingle from './SignInSingle'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavComponent from '../UI/NavComponent'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class SignInPage extends Component {
  

    render() {

        const {projects, auth, profile, innerprojects, comments, notifications} = this.props;

        if (auth.uid) return <Redirect to='/dashboard' />


        return(
        <>
        <NavComponent notifications={notifications} comments={comments} innerprojects={innerprojects} projects={projects} auth={auth} profile={profile}/>
        <div className="container login-container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Sign In</h1>
                </div>
                <SignInOrg />
                <SignInSingle />
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
    )(SignInPage)
