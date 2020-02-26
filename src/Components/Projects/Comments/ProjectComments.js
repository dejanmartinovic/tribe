import React  from 'react'
import ProjectComment from './ProjectComment'



const ProjectComments = ({comments,currentProject, theProjectId, view}) => {

        //mark comments as read
        //If user scrolls past comment, add UID to hasRead array in comment document
        //when displaying comment in status, do not include ones with UID in hasRead

 

    return(
        <div className="comment-list section row">

            <div className="col-md-12">
            <h1>Comments</h1>
            </div>
            
        
            { comments && comments.map(comment => {
              
             

               
                    return(
                        <>
                        {comment.id ?
                        
                            <div className="col-md-12" id="canView">
                            <div id={comment.id}>
                                <ProjectComment commentDocumentId={comment.id} currentProject={currentProject} theProjectId={theProjectId} comment={comment} key={comment.id}/>
                            </div>
                            
                            </div>
                              : null}
                        </>
                            
                    )
                 
               
               
            })}

           
        </div>
    )
}

export default ProjectComments
