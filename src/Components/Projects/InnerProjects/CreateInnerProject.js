import React, { Component} from 'react'
import { connect } from 'react-redux'
import { createInnerProject } from '../../../Store/Actions/projectActions'
import firebase from 'firebase/app'
import 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import addButtonBg from '../../../assets/add-button-bg.png';

class CreateInnerProject extends Component {
    state = {
        title: '',
        content: '',
        projectId: this.props.projectId,
        projectAmount: '',
        show : false,
        setShow : false,
        organisation: this.props.project.organisation,
        admin: this.props.project.admin,
        canView: this.props.project.canView,
        projectTitle: this.props.project.title
    }

    

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
       
    }

    handleSubmit = (e) => {
      e.preventDefault();
      
      this.props.createInnerProject(this.state) 

      //for status bar
      
      var db = firebase.firestore();
      const increment = firebase.firestore.FieldValue.increment(1);
    //   when delete const decrement = firebase.firestore.FieldValue.increment(-1);
        db.collection('projects').doc(this.props.projectId).update({

            projectAmount:  increment,
            total: increment
            
        })

        console.log(this.props.project.canView)
        
        

           document.getElementById("title").value = "";
           document.getElementById("content").value = "";



 
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

        var buttonBgStyle = {
            backgroundImage: `url(${addButtonBg})`
          };
         

        return(
            <div className="row">
                <div className="col-md-12">
                <div className="create-new-banner" style={buttonBgStyle} variant="primary" onClick={this.handleShow}>
                    <h1> <FontAwesomeIcon icon={faPlus} /> Add New Gathering</h1>
                </div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Gathering</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input onChange={this.handleChange} className='form-control' type="text" id='title' placeholder='Gathering Title'/>
                        </div>
                            <div className="form-group">
                                                
                                <textarea
                                    onChange={this.handleChange}
                                    className='form-control'
                                    id="content"
                                    rows="3"
                                    placeholder='Gathering Description'>

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
                </div>
            </div>
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
        createInnerProject: (project) => dispatch(createInnerProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInnerProject)