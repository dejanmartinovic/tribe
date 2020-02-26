import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

class EditInnerProject extends Component {
    state = {
        title: '',
        content: '',
        hideModal: false,
        showModal: '',
        theProject: ''
    }   

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
       
    }

    handleClose = () => {
        this.setState({
            show : false
        })
    }
    handleShow = (e) => {
        const projectToEdit = e.target.parentElement.getAttribute('id');
        this.setState({
            show : true,
            theProject : projectToEdit
        })

        var db = firebase.firestore();
        const ref = this;
         var docRef = db.collection('innerprojects').doc(projectToEdit)
         docRef.get().then(function(doc) {
             var data = doc.data();
             if (doc.exists) {
                ref.setState({
                    title: data.title,
                    content: data.content
                })
                document.getElementById("title").value = data.title;
                document.getElementById("content").value = data.content;
             }else {
                 console.log("No Project")
             }
         })
       
        
    }

    handleSubmit = (e) => {

        e.preventDefault();
        var db = firebase.firestore();
        const projectToEdit = this.state.theProject
    
  
        
             db.collection("innerprojects").doc(projectToEdit).update({
                title : this.state.title,
                content: this.state.content
            })
        

    }

    render() {

         

        return(
            <>
        <Link variant="primary" onClick={this.handleShow} className="dropdown-item">Edit</Link>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input onChange={this.handleChange} className='form-control' type="text" id='title' placeholder='Project Title'/>
            </div>
                <div className="form-group">
                                    
                    <textarea
                        onChange={this.handleChange}
                        className='form-control'
                        id="content"
                        rows="3"
                        placeholder='Project Content (can add some more options here later)'>

                    </textarea>
                </div>
                 <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={this.handleClose}>
                    Save Changes
                    </Button>
          </Modal.Footer>
            </form>

          </Modal.Body>
          
        </Modal>
      </>
        )
    }
}



export default (EditInnerProject)