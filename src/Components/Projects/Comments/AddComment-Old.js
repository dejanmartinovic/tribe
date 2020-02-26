import React, { Component } from 'react'
import {createComment} from '../../../Store/Actions/commentActions'
import { connect } from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import firebase from 'firebase/app'
import 'firebase/firestore';






// import ReactQuill from 'react-quill'
//import 'react-quill/dist/quill.snow.css'
class ProjectAddComment extends Component {

    state = {
        content: '',
        value: '',
        projectId: this.props.projectId,
        parentId: this.props.parentId,
        preContent: 'Add a message'
    };


    // handleChange(data) {
        
    //     this.setState( {
    //         content: content.target.value
    //     } );
    // }

    handleFocus = (e) => {
        this.setState({
            preContent : ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createComment(this.state)
        this.setState({
            content : ''
        })

      var db = firebase.firestore();
      const increment = firebase.firestore.FieldValue.increment(1);
    //   when delete const decrement = firebase.firestore.FieldValue.increment(-1);
        db.collection('projects').doc(this.state.parentId).update({

            commentAmount :  increment,
            total: increment
            
        })

      
    }

    render() {


        class MyUploadAdapter {
            constructor(loader) {
                this.loader = loader;
            }
            upload() {
                return this.loader.file
                    .then(file => new Promise((resolve, reject) => {
                        this._initRequest(file);
                        this._initListeners(resolve, reject, file);
                        this._sendRequest(file);
                        
                    }));
            }
            abort() {
                if (this.xhr) {
                    this.xhr.abort();
                }
            }
            
            _initRequest(file) {
                
                const xhr = this.xhr = new XMLHttpRequest();
                var proxyurl = "https://cors-anywhere.herokuapp.com/";
                var url = `https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/${file.name}`;
                
                //URL to save files too
                xhr.open("POST", proxyurl + url, true);
                xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://boomapp-8d7cc.firebaseapp.com');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            }
        
            // Initializes XMLHttpRequest listeners.
            _initListeners( resolve, reject, file) {
                const xhr = this.xhr;
                const loader = this.loader;
                const genericErrorText = `Couldn't upload file: ${file.name}.`;
               
                xhr.addEventListener('error', () => reject(genericErrorText));
                xhr.addEventListener('abort', () => reject());
                xhr.addEventListener('load', () => {
                    const response = xhr.response;
                    console.log('response = ' + response)
                    var value;
                    var storage = firebase.storage();
                    var storageRef = storage.refFromURL(`gs://boomapp-8d7cc.appspot.com/${file.name}`)
                    console.log('storage ref = ' + storageRef)
                   

                    console.log('responseURL = ' + value)

                    
                    if (!response || response.error) {
                        return reject(response && response.error ? response.error.message : genericErrorText);
                    }

                    storageRef.getDownloadURL().then(function(url) {
                        console.log(url)
                        resolve({
                            default: url
                        });
                    });
        
                   
                });
        
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', evt => {
                        if (evt.lengthComputable) {
                            loader.uploadTotal = evt.total;
                            loader.uploaded = evt.loaded;
                        }
                    });
                }
            }
        
            _sendRequest(file) {
                
                const data = new FormData();            
                data.append('upload', file);
                this.xhr.send(data);
            }
        }
        
        function MyCustomUploadAdapterPlugin(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new MyUploadAdapter(loader);
            };
        }
        
        const editorConfiguration = {
            extraPlugins: [MyCustomUploadAdapterPlugin]
        };

 
        return(
           
                <div className="comment-reply">
                    
                    <h1>Reply:</h1>
                    <form class="comment-form" onSubmit={this.handleSubmit} onFocus={this.handleFocus}>
                        <div className="form-group comment-reply-content">
                        

                        <CKEditor 
                          
                          config={editorConfiguration}
                            editor={ ClassicEditor }
                            
                            data={this.state.preContent}
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                                
                            } }
                            
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                                //this.handleChange(data);
                                this.setState( {
                                    content: data
                                } );
                               
                            } }
                
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

/* <ReactQuill
                                
onChange={this.handleChange}
modules={ProjectAddComment.modules}
cols='50'
rows='10'
value={this.state.content}
placeholder='Add a comment' 
/> */

// ProjectAddComment.modules = {
//     toolbar: [
//     [{ 'header': [1, 2, 3, 4, 5] }], 
//     ['bold', 'italic', 'underline','strike','blockquote'],          
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],                  
//     [{ 'color': [] }, { 'background': [] }],
//     ['clean']                                       
//     ]
// };

// ProjectAddComment.formats = [
//     'header', 'font', 'size',
//     'bold', 'italic' , 'underline', 'strike', 'blockquote',
//     'list', 'bullet'
// ];

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment) => dispatch(createComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(ProjectAddComment)