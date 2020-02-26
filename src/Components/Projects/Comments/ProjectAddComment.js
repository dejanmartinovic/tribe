import React, { Component } from 'react'
import FroalaEditorComponent from "react-froala-wysiwyg";
//import FroalaEditor from 'react-froala-wysiwyg';
import {createComment} from '../../../Store/Actions/commentActions'
import { connect } from 'react-redux'
// Require Editor JS files.

import 'froala-editor/js/froala_editor.pkgd.min.js';
import '../../../../node_modules/froala-editor/js/plugins/font_family.min.js';



// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';


import firebase from 'firebase/app';
import 'firebase/firestore';


class ProjectAddComment extends Component {

    state = {
        model: '',
        value: '',
        projectId: this.props.projectId,
        parentId: this.props.parentId,
        preContent: 'Add a message',
        commentAuthor: this.props.auth.email,
        organisation: this.props.project.organisation,
        canView: this.props.project.canView,
        admin: this.props.project.admin,
        currentProjectTitle: this.props.currentProject.title
    };

    

  

    handleSubmit = (e) => {
        e.preventDefault();
       
        this.setState({
            model : ''
        })

      var db = firebase.firestore();
      const increment = firebase.firestore.FieldValue.increment(1);
    //   when delete const decrement = firebase.firestore.FieldValue.increment(-1);
        db.collection('projects').doc(this.state.parentId).update({

            commentAmount :  increment,
            total: increment
            
        })

    this.props.createComment(this.state)
    }
  


      
      handleModelChange = (model) => {
        // html is the new html content
        // text is the new text content
        
        this.setState( {
            model: model
        } );

        console.log(this.state.model)
      }

      

      

    render() { 

        var timestamp = Number(new Date());
        var storageRef = firebase.storage().ref(this.props.currentProject.organisation + '/' + timestamp.toString());
        // var thisModel = this.state.model;

        this.config = {
            name: "textarea",
            key: "Kb3A3pD2E1F2E4E4I3oylbeqH-9C-7I2orrjthmmwyD4C3D2D2C4C1G1H4A1A1==",
            placeholderText: 'Edit Your Content Here!',
            toolbarButtons: [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'], ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], ['inlineClass', 'inlineStyle', 'clearFormatting']],
            events: {
                "file.error": function(error, response) {
                  console.log(error);
                  console.log(response);
                },
                
                "file.beforeUpload": function(files) {
                  let editor = this;
                  for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    console.log(file);
                    storageRef.put(file).then(snapshot => {
                      return snapshot.ref.getDownloadURL(); 
                      
                    }).then(downloadURL => {
                      console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                      // thisModel = thisModel + downloadURL;
                      
                      editor.popups.hideAll();
                        
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
                  "image.beforePasteUpload": function(images) {

                    for (let index = 0; index < images.length; index++) {
                      const image = images[index];
                      console.log('file name?' + image.name);
                      storageRef.put(image).then(snapshot => {
                        return snapshot.ref.getDownloadURL(); 
                        
                      }).then(downloadURL => {
                        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                        // thisModel = thisModel + downloadURL;
                        
                          console.log('file url = ' +  downloadURL)
                          
                          this.html.insert('<img src=' + downloadURL + '></img>', true);
                       
                       
                     }).catch((e) => {
                        console.log(e);
                      })
                    }
                    // You need to set it as false, to prevent Froala uplaod.
                    return false;

                  },
                  "image.beforeUpload": function(images) {
                    let editor = this;
                    for (let index = 0; index < images.length; index++) {
                      const image = images[index];
                      storageRef.put(image).then(snapshot => {
                        return snapshot.ref.getDownloadURL(); 
                        
                      }).then(downloadURL => {
                        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                        // thisModel = thisModel + downloadURL;
                        
                          console.log('file url = ' +  downloadURL)
                          editor.popups.hideAll();
                          
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

           
               <div className="comment-reply">
                    
                    <h1>Reply:</h1>
                    <form class="comment-form" onSubmit={this.handleSubmit} onFocus={this.handleFocus}>
                        <div id="editor" className="form-group comment-reply-content">
                        <FroalaEditorComponent
                          tag='textarea'
                          config = {this.config}
                          model={this.state.model}
                          onModelChange={this.handleModelChange}
                          
                       
                        />
                        
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"  />
                        </div>
                    </form>
                    
                </div>    
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment) => dispatch(createComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(ProjectAddComment)