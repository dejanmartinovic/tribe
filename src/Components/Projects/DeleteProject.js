import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore';

class CreateProject extends Component {
    state = {
    }   

  

    handleDeleteProject = (e) => {
    //     e.preventDefault();
    //    this.props.createProject(this.state)
    const projectToDelete = e.target.parentElement.getAttribute('id');


    var db = firebase.firestore();

    db.collection('projects').doc(projectToDelete).delete()

    var deleteComments =  db.collection('comments').where('parentId', '==', this.props.project.projectID)
      deleteComments.get().then(function(querySnapshot) {

          querySnapshot.forEach(function(doc) {
              doc.ref.delete(); 
          })
      })

      var deleteInnerProjects =  db.collection('innerprojects').where('projectId', '==', this.props.project.projectID)
      deleteInnerProjects.get().then(function(querySnapshot) {

          querySnapshot.forEach(function(doc) {
              doc.ref.delete(); 
          })
      })

}

    

    render() {
        
        return(

        <Link onClick={this.handleDeleteProject} className="dropdown-item">Delete</Link>
        )
    }
}



export default (CreateProject)