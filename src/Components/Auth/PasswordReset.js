import React, { Component } from 'react'
import NavComponent from '../UI/NavComponent'
import firebase from 'firebase/app'
import 'firebase/firestore';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class PasswordReset extends Component {

    state = {
        message : ''

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
        console.log(this.state.email)
    }



    handleSubmit = event => {
        event.preventDefault();
        firebase.auth().fetchSignInMethodsForEmail(this.state.email)
         .then(result => {
            if (result.length > 0) {
                firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(() => {
                console.log("Success");
                this.setState({
                    message : 'Email sent'
                })
                })
                .catch((error) => {
                    document.getElementById('error-text').innerHTML = error
                console.log(error);
                });  
                }else {
                    this.setState({
                        message : 'No such account with this email'
                    })
                }
            
         });
        
      };


    render() {

        const {projects, auth, profile, innerprojects, comments, notifications} = this.props;


 
        
        return (
            <>
            <NavComponent notifications={notifications} comments={comments} innerprojects={innerprojects} projects={projects} auth={auth} profile={profile}/>

           <div className="container">
               <div className="row">
               <div className="col-md-12 login-form-2 ">
                    <h3 className="email-reset-title">Password Reset</h3>
                    <p className="email-reset-sub-title">Input your email to get a password reset email (check your junk mail)</p>
                    <form onSubmit={this.handleSubmit} className="email-reset-form">
                        <div className="form-group">
                             <p className="error-message" id="error-text"></p>
                             {this.state.message === 'Email sent' ? <p id="success-text">Email sent</p> : null}
                             {this.state.message === 'No such account with this email' ? <p id="error-text">No such account with this email</p> : null}
                             <p id="success-text"></p>
                            <input type="email" id="email" onChange={this.handleChange} className="form-control" placeholder="Your Email *" />
                        </div>
                        <div className="form-group button-group">
                            <input type="submit" className="btnSubmit" />
                        </div>
                        <div className="form-group">
                       
                            
                        </div>
  
                           
                       
                    </form>
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
    )(PasswordReset)
