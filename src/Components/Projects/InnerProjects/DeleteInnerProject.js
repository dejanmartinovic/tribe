import React, { Component} from 'react'
import { connect } from 'react-redux'
import { deleteInnerProject } from '../../../Store/Actions/projectActions'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore';

class DeleteInnerProject extends Component {
    state = {
}

  

    handleDeleteProject = (e) => {
    //     e.preventDefault();
    //    this.props.createProject(this.state)
    const projectToDelete = e.target.parentElement.getAttribute('id');
    this.props.deleteInnerProject(projectToDelete);
    

    var db = firebase.firestore();
    var decreaseThis = this.props.project.projectId
    const decrement = firebase.firestore.FieldValue.increment(-1);
  //   when delete const decrement = firebase.firestore.FieldValue.increment(-1);
      db.collection('projects').doc(decreaseThis).update({

          projectAmount:  decrement
          
      })

      //delete all comments which relate to the innerProject
      var deleteComments =  db.collection('comments').where('projectId', '==', this.props.project.innerProjectId)
      deleteComments.get().then(function(querySnapshot) {
        var i = 0;
          querySnapshot.forEach(function(doc) {
              doc.ref.delete(); 
              i++
          })
          
         var a = 1;
         console.log('i value = ' + i)
          while(i >= a){
            
                db.collection('projects').doc(decreaseThis).update({

                    commentAmount:  decrement
                    
                })


            a++;
        }
    })


    }

    

    render() {
        
        return(

        <Link onClick={this.handleDeleteProject} className="dropdown-item">Delete</Link>
        )
    }
}

  const mapDispatchToProps = (dispatch) => {
      return {
          deleteInnerProject: (projectToDelete) => dispatch(deleteInnerProject(projectToDelete))
      }
  }

export default connect(null, mapDispatchToProps)(DeleteInnerProject)