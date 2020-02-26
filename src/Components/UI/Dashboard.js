import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import ProjectList from '../Projects/ProjectList'
import { compose } from 'redux'
import CreateProject from '../Projects/CreateProject'
import { Redirect } from 'react-router-dom'
import NavComponent from './NavComponent'
import MainSidebar from'./MainSidebar'
import SearchMain from './Search/SearchMain'
import Notifications from './Notifications'


class Dashboard extends Component {
    state = {
        admins: ''
    }

  

    componentDidMount () {
        this.setState({ mounted: true })
     }
    
    render() {

        
        
        const {projects, auth, profile, organisations, innerprojects, comments, notifications} = this.props;
        
       
            const searchMain = auth.uid ? <SearchMain profile={profile} comments={comments} innerprojects={innerprojects} projects={projects}/>  : null
            const notificationMain = auth.uid ? <Notifications profile={profile} notifications={notifications} /> : null

       
        if (!auth.uid) return <Redirect to='/signin' />
  
        

        if(!isLoaded(this.props.projects)){
            console.log('Loading..')
        }
        
        if(this.state.mounted === true){
        return (
            <>
            <NavComponent  notifications={notifications} comments={comments} innerprojects={innerprojects} projects={projects} auth={auth} profile={profile}/>
           
            <div className="container project-details-container">
            <div className="row home-header-row">
                <MainSidebar projects={projects} profile={profile}/>
                <div className="col-lg-9 dash-section section">
               
                    <div className="row">
                        <div className="col-md-10">
                            {searchMain}
                        </div>
                        <div className="col-md-2 notifications-col">
                            {this.props.projects? notificationMain : null}
                            <CreateProject admins={this.state.admins} organisations={organisations}/>
                        </div>
                    </div>
                    {this.props.projects? <ProjectList auth={auth} projects={projects} authID={auth.uid} profile={profile}/> : null }
                    
                </div>
                
            </div>
            </div>
            </>
        )
        }else{
            return <p>Log In</p>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        comments: state.firestore.ordered.comments,
        innerprojects: state.firestore.ordered.innerprojects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        notifications: state.firestore.ordered.notifications,
        organisations: state.firestore.ordered.organisations
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
    )(Dashboard)
