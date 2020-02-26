import React from 'react'
import renderHTML from 'react-render-html'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/firestore';
//import { Link } from 'react-router-dom'
import DeleteComment from './DeleteComment'
import EditComment from './EditComment'
import ViewedBy from './ViewedBy'
import VisibilitySensor from "react-visibility-sensor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'



const ProjectContent =({comment,currentProject, theProjectId, isVisible, profile, commentDocumentId}) => {

   

    function onChange (isVisible) {
        
        // console.log('Element is now %s' + comment.id , isVisible ? 'visible' : 'hidden');
        if (isVisible){
           

            var db = firebase.firestore();
            db.collection('comments').doc(commentDocumentId).update({

                viewedBy:  firebase.firestore.FieldValue.arrayUnion(profile.email)
                
            })
        }
    }
    if (theProjectId === comment.projectId){
      
    }

    var filterAdmin = false;
        if(currentProject.admin){
           
            if(currentProject.admin.includes(profile.email)){
                filterAdmin = true;
            }
        }

       
        var background = profile.avatarURL

        if(!background) {
            background = 'https://static.thenounproject.com/png/4815-200.png'
        }
        var profileImage = {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
     
    
    
    return(

   
    <div>
        {theProjectId === comment.projectId ?
        
            <div className="card comment-container">
                {filterAdmin  === true || comment.commentAuthor === profile.email ||
                currentProject.orgOwner === profile.email
                ?  
                <>
                <button className="btn btn-secondary dropdown-toggle project-options" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FontAwesomeIcon icon={faCog} />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id={comment.id}>
                    <EditComment />
                    <DeleteComment comment={comment} />
                    
                </div> 
                </>
                : null}
                
               
                <div className="card-body" id={comment.commentId}>
                {comment ? 
                     <div class="dropdown views-dropdown">
                        <button class="viewed-button" type="button" data-toggle="dropdown">
                        <FontAwesomeIcon icon={faEye} />
                        </button>
                        
                        <ul class="dropdown-menu viewed-by" id="views">
                            <li className="viewed-by-title">Viewed By</li>
                             <ViewedBy viewedBy={comment.viewedBy} />
                        </ul>
                    </div>
                                   
                    : null }

                     <VisibilitySensor onChange={onChange}>
                        <div className="card-title">
                        <div style={profileImage} className="profile-picture comment-icon">
                        </div>
                        <div className="comment-details">
                            <p>{comment.authorFirstName} {comment.authorLastname} | {comment.createdAt.toDate().toDateString()} {comment.createdAt.toDate().toLocaleTimeString('en-US', {
                                    hour12: true,
                                    formatMatcher: 'best fit' ,
                                    minute: 'numeric',
                                    hour: 'numeric'
                                    
                            })}</p>
                        </div>
                       
                        </div>
                    </VisibilitySensor>
                    
                    
                    <div className="card-text trix-content">
                        {renderHTML(comment.model)}
                    </div>
                    <VisibilitySensor onChange={onChange}>
                    <div className="footer-view-checker">
                        
                    </div>
                    </VisibilitySensor>
                </div>
            </div>
       
        : null}

    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        organisations: state.firestore.ordered.organisations
    }
}

export default connect(mapStateToProps, null)(ProjectContent)