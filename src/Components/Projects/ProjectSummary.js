import React, {Component} from 'react'
// import ProjectStatusBar from './ProjectStatusBar'
import firebase from 'firebase/app'
import 'firebase/firestore';

class ProjectSummary extends Component {


    render() {

        var db = firebase.firestore();
        db.collection("projects").where('projectID', '==', this.props.project.projectID).get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc) {
              var data = doc.data();
               var pAmouunt = data.projectAmount;
               var cAmount = data.commentAmount;
               var totalEntries = pAmouunt + cAmount;
                db.collection("projects").doc(doc.id).update({
                    totalEntries : totalEntries
                })
            })
        })

        var background = this.props.profile.avatarURL

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

       
        
        <div className="card z-depth-0 project-summary">
            
            <div className="card-content grey-text text-darken-3">
            <div style={profileImage} className="profile-picture post-avatar">

            </div>
                
                <span className="card-title">{this.props.project.key}</span>
                <h2>{this.props.project.title}</h2>
                <div className="row">
                    <div className="col-md-12">
                        <p className="post-content">{this.props.project.content}</p>
                        <p className="post-by">{this.props.project.authorFirstName} {this.props.project.authorLastname}</p>
                    </div>
                </div>
                     
            </div>

            
        </div>
        
        )
    }
}

export default ProjectSummary