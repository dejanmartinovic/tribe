import React, { Component} from 'react'
import { connect } from 'react-redux'
import { deleteComment} from '../../../Store/Actions/projectActions'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore';

class DeleteComment extends Component {
    state = {
        comment : this.props.comment
}

  

    handleDeleteComment = (e) => {
    //     e.preventDefault();
    //    this.props.createProject(this.state)
    const commentToDelete = e.target.parentElement.getAttribute('id');
    this.props.deleteComment(commentToDelete);
    

    var db = firebase.firestore();
    const decrement = firebase.firestore.FieldValue.increment(-1);
  //   when delete const decrement = firebase.firestore.FieldValue.increment(-1);
      db.collection('projects').doc(this.state.comment.parentId).update({

          commentAmount:  decrement
          
      })
    }

    

    render() {

 
        
        return(

        <Link onClick={this.handleDeleteComment} className="dropdown-item">Delete</Link>
        )
    }
}

  const mapDispatchToProps = (dispatch) => {
      return {
        deleteComment: (commentToDelete) => dispatch(deleteComment(commentToDelete))
      }
  }

export default connect(null, mapDispatchToProps)(DeleteComment)