import React, {Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose }  from 'redux'
// import { Link } from 'react-router-dom'
// import ProjectComments from './Comments/ProjectComments'
// import ProjectAddComment from './Comments/ProjectAddComment'
import CreateInnerProject from '../Projects/InnerProjects/CreateInnerProject'
import InnerProjectList from '../Projects/InnerProjects/InnerProjectList'
import { Redirect } from 'react-router-dom'
import NavComponent from '../UI/NavComponent'
import MainSidebar from'../UI/MainSidebar'
import SearchMain from '../UI/Search/SearchMain'
import Notifications from '../UI/Notifications'
import  Breadcrumbs from '../UI/Breadcrumbs'

//import { SlowBuffer } from 'buffer'

class ProjectDetails extends Component {
 
    goBack() {
        window.history.back();
      }

    render() {

        
        if(this.props.project) {
            if (!this.props.project.canView.includes(this.props.auth.email)) return <Redirect to='/signin' />
            const projectId = this.props.project.projectID

            const searchMain = this.props.auth.uid ? <SearchMain profile={this.props.profile} comments={this.props.comments} innerprojects={this.props.innerprojects} projects={this.props.projects}/>  : null
            const notificationMain = this.props.auth.uid ? <Notifications profile={this.props.profile} notifications={this.props.notifications} /> : null
            
        return (
        <>
        <NavComponent notifications={this.props.notifications} comments={this.props.comments} innerprojects={this.props.innerprojects} projects={this.props.projects} auth={this.props.auth} profile={this.props.profile}/>
        <div className="container project-details-container" >
            
            
           <div className='row'>
            
                    <MainSidebar currentProject={this.props.project.title} projects={this.props.projects} profile={this.props.profile} />        
                    <div className="col-lg-9 section">
                    
                 
                        <div className="row">
                        <div className="col-md-10">
                            {searchMain}
                            <Breadcrumbs currentProject={this.props.project} auth={this.props.auth}/>
                        </div>
                        <div className="col-md-2 notifications-col">
                            {this.props.projects? notificationMain : null}
                            
                        </div>
                        <div className="col-md-12">
                        <h1>{this.props.project.title}</h1>
                         <p>{this.props.project.content}</p>
                        </div>
                         
  
                   
                   
                   
                        
                        
                        
                    </div>
                    <CreateInnerProject project={this.props.project} projectId={projectId} />
                    <InnerProjectList project={this.props.project} profile={this.props.profile} auth={this.props.auth} innerprojects={this.props.innerprojects} projectId={projectId}/>

                    </div>
            
                
            </div>
            

           
        </div>
        </>
       
        )
    }else {
        return (
            <>
            <NavComponent innerprojects={this.props.innerprojects} projects={this.props.projects} auth={this.props.auth} profile={this.props.profile}/>
            <div className="container loading-container">
                <div className="row">
                    <div className="col-md-12">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
            </>
                
            )
    }
    }
}

const mapStateToProps = (state, ownProps) => {
   
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    return {
        project: project,
        comments : state.firestore.ordered.comments,
        innerprojects: state.firestore.ordered.innerprojects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        projects: state.firestore.ordered.projects,
        notifications: state.firestore.ordered.notifications
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
    )(ProjectDetails)

