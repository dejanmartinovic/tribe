import React, { Component} from 'react'
import ProjectListDetails from './ProjectListDetails'

import 'firebase/firestore';

class ProjectList extends Component {
    state = {
        mounted: false
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.projects !== nextProps.projects;
    //   }

    componentDidMount () {
        this.setState({ mounted: true })
     }
    
      
  render() {

    // console.log('projects = ' + this.props.projects)
   
    return(
        

        <div className="project-list section">
           
            {
                
                this.props.projects && this.state.mounted === true && this.props.projects.map(project => {
                
                const projectId = project.authorID + project.createdAt.toDate().toLocaleTimeString('it-it') + project.title
                

                if(this.props.profile){
                    
                    
                return(

               <>
                    
                  
                    { project.canView.includes(this.props.profile.email) || (project.organisation === '' && project.authorEmail.includes(this.props.profile.email))  ?
                        
                    <ProjectListDetails auth={this.props.auth} project={project} profile={this.props.profile} projectId={projectId}></ProjectListDetails>
                            
                    : null}
                  
                </>
                  
                    
                )
            }
            return null

            })}
        </div>
     
    )
    }
}


export default ProjectList
