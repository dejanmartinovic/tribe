import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {Redirect} from 'react-router-dom'
import Users from './Users'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


class ListUsers extends Component {
        
      
    render() {
        
        const {profile, organisations} = this.props;


        // if (profile.isOrg === false) return <Redirect to='/signin' />
       
    
        return(
            <div className="row">
                <div className="col-md-12">
                        <table class="table-striped">
                        <Users organisations={organisations} profile={profile} />
                        </table>
                        <p className="" id="addUser"></p>
                      
                    
                </div>
                
                

            </div>
        )
    }
}
    

// const mapStateToProps = (state, ownProps) => {
//     //console.log(state);
//     const id = ownProps.match.params.id;
//     const projects = state.firestore.data.projects
//     const project = projects ? projects[id] : null
//     return {
//         project: project,
//         comments : state.firestore.ordered.comments
//     }
// }

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        organisations: state.firestore.ordered.organisations
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'organisations'}
        ])
        )(ListUsers)


