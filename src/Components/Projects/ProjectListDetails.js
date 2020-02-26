import React, { Component} from 'react'

import EditProject from './EditProjects'
import DeleteProject from './DeleteProject'
import {Link} from 'react-router-dom'
import ProjectSummary from './ProjectSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'




class ProjectListDetails extends Component {



    render() {
        var filterAdmin = false;
        if(this.props.project.admin){
           
            if(this.props.project.admin.includes(this.props.profile.email)){
                filterAdmin = true;
            }

        }
        
        if(this.props.project){
            return (
                <div className="row" key={this.props.project.projectID}>
                                
                                
                                    
                <div className="col-md-12"  key={this.props.project.projectID}>
                {filterAdmin  === true || this.props.project.authorEmail === this.props.auth.email ||
                this.props.project.orgOwner === this.props.auth.email
                ?  
                <>
                    <button className="btn btn-secondary project-options" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FontAwesomeIcon icon={faCog} />
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id={this.props.project.projectID}>
    
                        <EditProject/>
                        <DeleteProject project={this.props.project} />
                        
                    </div>
                    </>
                : null}
               
                    <Link className="projectLink" to={'/project/' + this.props.project.projectID} currentProject={this.props.project.title} key={this.props.project.id} profile={this.props.profile} projectId={this.props.projectId} project={this.props.project}>
                    <ProjectSummary projectId={this.props.projectId} project={this.props.project} key={this.props.project.projectID} auth={this.props.auth} profile={this.props.profile} authID={this.props.authID} />
                    </Link>
                    
                </div>
               
                </div>
            )
        }else {
            return <h1>Loading</h1>
        }
        
    }

}

export default ProjectListDetails