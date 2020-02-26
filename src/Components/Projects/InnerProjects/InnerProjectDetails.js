import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose }  from 'redux'
import { Redirect } from 'react-router-dom'
import ProjectComments from '../Comments/ProjectComments'
import ProjectAddComment from '../Comments/ProjectAddComment'
import NavComponent from '../../UI/NavComponent'
import MainSidebar from'../../UI/MainSidebar'
import SearchMain from '../../UI/Search/SearchMain'
import Notifications from '../../UI/Notifications'
import  Breadcrumbs from '../../UI/Breadcrumbs'


const InnerProjectDetails = (props) => {
    const {innerproject, comments, auth, projects, innerprojects, profile, notifications} = props;
    //const projectId = innerproject.authorID + innerproject.createdAt.toDate().toLocaleTimeString('it-it') + innerproject.title

      if (!auth.uid) return <Redirect to='/signin' />


    if(innerproject) {
        var innerProjectId = innerproject.authorID + innerproject.createdAt.toDate().toLocaleTimeString('it-it') + innerproject.title
        innerProjectId = innerProjectId.replace(/[^a-zA-Z0-9]/g,'_');
        if (!innerproject.canView.includes(auth.email)) return <Redirect to='/signin' />

        const searchMain = auth.uid ? <SearchMain profile={profile} comments={comments} innerprojects={innerprojects} projects={projects}/>  : null
        const notificationMain = auth.uid ? <Notifications profile={profile} notifications={notifications} /> : null


        return (
            <>
            <NavComponent notifications={notifications} comments={comments} innerprojects={innerprojects} projects={projects} auth={auth} profile={profile}/>
        <div className="container project-details-container">

            
           <div className='row'>
               
                    <MainSidebar currentProject={innerproject.projectTitle} projects={projects} profile={profile} />        

                    <div className="col-lg-9 dash-section section">
                    <div className="row">
                        <div className="col-md-10">
                            {searchMain}
                            <Breadcrumbs mainProject={innerproject.projectTitle} currentProject={innerproject} auth={auth}/>
                        </div>
                        <div className="col-md-2 notifications-col">
                            {projects? notificationMain : null}
                            
                        </div>
                    </div>
                    <div className="col-md-12 project-details-title">
                            <h1>{innerproject.title}</h1>
                           
                        
                    </div>
                    <div className="col-md-12 project-details-content">
                        <p>{innerproject.content}</p>
                        
                    </div>
                        <ProjectComments comments={comments}  theProjectId={innerProjectId} currentProject={innerproject} />
                        <ProjectAddComment auth={auth} project={innerproject} parentId={innerproject.projectId} currentProject={innerproject} projectId={innerProjectId}/>
                    </div>
                    
            </div>
        </div>
        </>
       
        )
    }else {
        return (
            <div className="container loading-container">
                <div className="row">
                    <div className="col-md-12">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
                
            )
    }
    
    
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    const id = ownProps.match.params.id;
    const innerprojects = state.firestore.data.innerprojects
    const innerproject = innerprojects ? innerprojects[id] : null
    const projects = state.firestore.ordered.projects
    const project = projects ? projects[id] : null
    return {
        auth: state.firebase.auth,
        project: project,
        comments : state.firestore.ordered.comments,
        innerproject: innerproject,
        innerprojects: state.firestore.ordered.innerprojects,
        projects: state.firestore.ordered.projects,
        profile: state.firebase.profile,
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
)(InnerProjectDetails)
