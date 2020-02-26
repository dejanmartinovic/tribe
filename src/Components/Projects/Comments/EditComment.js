import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditorComponent from "react-froala-wysiwyg";
// import Froalaeditor from "froala-editor";
import 'froala-editor/js/plugins.pkgd.min.js';

class EditComment extends Component {
    constructor(props) {
		super(props)
		this.state = {
			model: '',
            hideModal: false,
            showModal: '',
            theComment: '',
            preMessage: ''
		}
	}

    handleModelChange = (model) => {
        // html is the new html content
        // text is the new text content
        
        this.setState( {
            model: model
        } );

        console.log(this.state.model)
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
        let currentComponent = this;
        
         var docRef = db.collection('comments').doc(projectToEdit)
         docRef.get().then(function(doc) {
             var data = doc.data();
             if (doc.exists) {
                currentComponent.setState({
                     model : data.model
                  });
                  console.log('content = ' + data.model)
                  console.log('to edit = ' + projectToEdit)
                  document.getElementsByClassName("fr-placeholder").value = data.model;
             }else {
                 console.log("No Project")
             }
         })
       
        
    }

    handleSubmit = (e) => {

        e.preventDefault();
        var db = firebase.firestore();
        const projectToEdit = this.state.theProject

          db.collection("comments").doc(projectToEdit).update({
            model: this.state.model
        })
        

    }

    render() {

        var timestamp = Number(new Date());
        var storageRef = firebase.storage().ref(timestamp.toString());
        // var thisModel = this.state.model;

        this.config = {
            // Allow to upload PNG and JPG.
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            placeholderText: 'Add a comment..?',
            toolbarButtons: [
              'fontSize', 'fontColor', '|',
              'bold', 'italic', 'underline', '|',
              'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|',
              'insertLink', 'insertImage', 'insertFile',  'embedly', 'insertTable', '|',
               
               'help', '|', 'undo', 'redo'],
              imageEditButtons: [
                'imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|',
                'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'
            ],
            events: {
                "file.error": function(error, response) {
                  console.log(error);
                  console.log(response);
                },
                "file.beforeUpload": function(files) {
                 
                  for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    console.log(file);
                    storageRef.put(file).then(snapshot => {
                      return snapshot.ref.getDownloadURL(); 
                      
                    }).then(downloadURL => {
                      console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    //   thisModel = thisModel + downloadURL;
                      
                        
                        
                        this.html.insert('<a href=' + downloadURL + '>'+ file.name +'</a>', true);
                     
                     
                   }).catch((e) => {
                      console.log(e);
                    })
                  }
                  // You need to set it as false, to prevent Froala uplaod.
                  return false;
                },
                "file.uploaded": function(e, editor, downloadURL) {
                 
                  
                    editor.file.insert(downloadURL);
                    return false
                  
                },
                "image.error": function(error, response) {
                    console.log(error);
                    console.log(response);
                  },
                  "image.beforeUpload": function(images) {
                    for (let index = 0; index < images.length; index++) {
                      const image = images[index];
                      console.log(image);
                      storageRef.put(image).then(snapshot => {
                        return snapshot.ref.getDownloadURL(); 
                        
                      }).then(downloadURL => {
                        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                        // thisModel = thisModel + downloadURL;
                        
                         
                          
                          this.html.insert('<img src=' + downloadURL + '></img>', true);
                       
                       
                     }).catch((e) => {
                        console.log(e);
                      })
                    }
                    // You need to set it as false, to prevent Froala uplaod.
                    return false;
                  }
                  
              }
          
            }  

         

        return(
            <>
        <Link variant="primary" onClick={this.handleShow} className="dropdown-item">Edit</Link>

        <Modal className="comment-edit-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                                    
                <FroalaEditorComponent
                          tag='textarea'
                          config = {this.config}
                          model={this.state.model}
                          onModelChange={this.handleModelChange}
                          
                       
                        />
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



export default (EditComment)