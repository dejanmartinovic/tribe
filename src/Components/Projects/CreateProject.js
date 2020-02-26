import React, { Component} from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../Store/Actions/projectActions'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import firebase from 'firebase/app'
import 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'




// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import renderHTML from 'react-render-html';

class CreateProject extends Component {
    state = {
        title: '',
        content: '',
        hideModal: false,
        showModal: '',
        show : false,
        setShow : false,
        canView:[this.props.auth.email],
        organisation:'',
        admin:[]
    }

    

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
       
    }

    handleSubmit = (e) => {
     
      e.preventDefault();
         
      
       this.setState({ canView: [] }); 

       this.props.organisations && this.props.organisations.map(organisation => {
        
        if (organisation.canView.includes(this.props.profile.email)) {
            this.state.admin.push(organisation.ownerEmail);
            const orgUser = organisation.canView.map((item, key) =>
                this.state.canView.push(item)
            );
            return orgUser
        }

        
       
        
          return null
    
       })      
       this.props.createProject(this.state) 
    

       document.getElementById("title").value = "";
       document.getElementById("content").value = "";

      //add admins to project
     

       

    }

    handleClose = () => {
        this.setState({
            show : false
        })

        
       
    }
    handleShow = () => {
        this.setState({
            show : true
        })
    }


    render() {

        if (this.props.profile.organisation) {

            var db = firebase.firestore();
            
                if(this.props.profile.organisation) {
                    
                    db.collection("organisations")
                    .where('canView', 'array-contains', this.props.profile.email)
                    .get()
                    .then(querySnapshot => {
                        if(querySnapshot.docs[0]){
                            let admin, member, orgOwner = '';
                     if(querySnapshot.docs[0].data().admin){
                         admin = querySnapshot.docs[0].data().admin;
                         }
                     if(querySnapshot.docs[0].data().member){
                            member = querySnapshot.docs[0].data().member;
                        }
                        if(querySnapshot.docs[0].data().orgOwner){
                            orgOwner = querySnapshot.docs[0].data().orgOwner;
                        }
                      this.setState({ 
                          admin: admin,
                          member: member,
                          orgOwner: orgOwner });
                        }
                     
                  });
                    
                }else {
                    
                }           
         }


           
       
        return(
          <>
            <Button className="btn btn-primary plus-btn" variant="primary" onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlus} />
            </Button>
      
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>New Project</Modal.Title>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        organisations: state.firestore.ordered.organisations
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)