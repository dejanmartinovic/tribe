import React, { Component }  from 'react'
import InnerProjectSummary from './InnerProjectSummary'
import { Link, Redirect } from 'react-router-dom'
import DeleteInnerProject from './DeleteInnerProject'
import EditInnerProject from './EditInnerProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

class InnerProjectList extends Component {
constructor(props) {
    super(props);
    
    
    this.state = {
        innerCount : 0
    }
    
}

    render() {

        var filterAdmin = false;
        if(this.props.project.admin){
           
            if(this.props.project.admin.includes(this.props.auth.email)){
                filterAdmin = true;
            }
        }

        if (!this.props.auth.uid) return <Redirect to='/signin' />
               
                return(

                    <div>
           
                        { 
                            this.props.innerprojects && this.props.innerprojects.map(innerProject => {
                                
                             
                            return(
                    
                                <div>
                                    {innerProject.projectId === this.props.projectId ?

                                  
                                        
                                           <div className="row">

                                                                
                                            <div className="col-md-12"  key={innerProject.id}>
                                            {filterAdmin  === true || innerProject.authorEmail === this.props.auth.email ||
                                            this.props.project.orgOwner === this.props.auth.email
                                            ?  
                                            <>
                                                <button className="btn btn-secondary dropdown-toggle project-options" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <FontAwesomeIcon icon={faCog} />
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id={innerProject.id}>
                                                    <DeleteInnerProject project={innerProject} />
                                                    <EditInnerProject/>                                   
                                                </div> 
                                            </>
                                            : null}
                                            
                                            <Link className="projectLink" to={{
                                                pathname: '/thread/' + innerProject.id,
                                                state: {
                                                project: this.props.projectId
                                                }
                                                }}>
                                                <InnerProjectSummary profile={this.props.profile} mainProject={this.props.project} project={innerProject.projectTitle} auth={this.props.auth} projectId={this.props.projectId}  innerproject={innerProject} key={innerProject.id} authID={this.props.authID} />
                                                </Link>
                                                
                                                
                                            </div>
                                            </div>  
                                        
                                        


                                    : null}
                                                
                                </div>   
                                )
                            })}
                        </div>
                    )
                    
                }
            }   
            
           
        
export default InnerProjectList
