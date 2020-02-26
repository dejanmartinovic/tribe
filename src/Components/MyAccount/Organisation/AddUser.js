import React, { Component } from 'react'
import {createUser} from '../../../Store/Actions/userOrgActions'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/firestore';

class ProjectAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: [],
            docID: this.props.orgID
        }
    }
    


    handleChange = (e) => {
        
            this.setState({
                [e.target.id]: e.target.value
            })
       
        }

    handleSubmit = (e) => {
        
        e.preventDefault();
        //console.log(this.props.profile); 

        var db = firebase.firestore();
        const userEmail = this.state.email;
    
        
       
       
              
                // db.collection("projects").where('authorEmail', '==', this.props.profile.email).update({
                //     canView : firebase.firestore.FieldValue.arrayUnion(this.state.email)
                // })

                // console.log('my email = ' + this.props.profile.email)

                const thisEmail = this.state.email;

                 db.collection('mail').add({
                    to: thisEmail,
                    message: {
                    from: 'Tribe',
                    subject: 'You have been invited to Tribe',
                    text: 'You have been invited to Tribe',
                    html: '<div style="width:320px;border:1px solid #000;margin:20px;padding:20px;text-align:center;">'+
                            '<img src="https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/website-files%2Ftribe-logo.svg?alt=media&token=d1d55ec0-f3ab-4537-b558-8837e4676056" alt=""/>'
                            + '<br />' +
                            '<h2>Someone has invited you to tribe</h2>'
                            + '<a href="https://mytribe.solutions/signup">Click Here To View</a>'
                            +'</div>'
                            
                    }
                })

                db.collection("projects").where('organisation', '==', this.props.profile.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("projects").doc(doc.id).update({
                            
                            canView : firebase.firestore.FieldValue.arrayUnion(thisEmail),
                            member:firebase.firestore.FieldValue.arrayUnion(thisEmail),
                            invited: firebase.firestore.FieldValue.arrayUnion(thisEmail)
                        })
                    })
                });

                db.collection("innerprojects").where('organisation', '==', this.props.profile.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("innerprojects").doc(doc.id).update({
                            
                            canView : firebase.firestore.FieldValue.arrayUnion(thisEmail),
                            member:firebase.firestore.FieldValue.arrayUnion(thisEmail)

                        })
                    })
                });

                db.collection("comments").where('organisation', '==', this.props.profile.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("comments").doc(doc.id).update({
                            
                            canView : firebase.firestore.FieldValue.arrayUnion(thisEmail),
                            member:firebase.firestore.FieldValue.arrayUnion(thisEmail)

                        })
                    })
                });

               

                

                  
                
                

                
                const thisOrg = this.props.organisation.organisation
                const thisProps = this.props;
                const thisState = this.state;
                //var userAdded = this.props.createUser(this.state)

               

               db.collection("users").where('email', '==', userEmail).where('organisation', '==', '').get()
               .then(function(querySnapshot) { 
                if (querySnapshot.empty) {
                    document.getElementById("addUser").innerHTML = userEmail + " is already in an organisation or does not exist";
                    document.getElementById("addUser").classList.add('text-danger');
                    
                  } else {
                    document.getElementById("addUser").innerHTML = "Invite sent to " + userEmail;
                    document.getElementById("addUser").classList.add('text-success');
                  }
                        querySnapshot.forEach(doc => {
                        db.collection("users").doc(doc.id).update({
                            organisation : thisOrg
                        })
                    
                        thisProps.createUser(thisState);
                    })
                     
                   
               })
                
                // .then(function(querySnapshot) { 
                  
                //     console.log(querySnapshot.docs)
                //     querySnapshot.forEach(function(doc) {
                //             db.collection("users").doc(doc.id).update({
                //                 organisation : thisOrg
                //          }).then(() => {
                //             if (!doc.exists) {
                //                 console.log('In org already')
                //             }else {
                //                 console.log('user added')
                //                 return thisProps.createUser(thisState);
                //             }
                            
                //          })
                        
                //     })
                    
                // })
                    
                    
                   document.getElementById("email").value = "";
                
        }

            
    

    render() {
 
        return(
                
                <div>
                    <h3 className="add-title">Add User:</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        
                            <input type="email" id="email" onChange={this.handleChange} className='form-control add-email-input' placeholder='New Email'></input>
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
        createUser: (user) => dispatch(createUser(user))
    }
}

export default connect(null, mapDispatchToProps)(ProjectAddUser)