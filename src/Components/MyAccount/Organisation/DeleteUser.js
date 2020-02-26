import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore';



class DeleteUser extends Component {
    state = {
        userEmail: this.props.userEmail,
        orgID: this.props.orgID
    }

    
   

    handleDeleteUser = (e) => {
        e.preventDefault();  
        
        function confirmDialog(msg) {
            return new Promise(function (resolve, reject) {
              let confirmed = window.confirm(msg);
          
              return confirmed ? resolve(true) : reject(false);
            });
           }

        confirmDialog('Do you really want to delete this?')
        .then(() => {

        var db = firebase.firestore();

        const userEmail = this.props.userEmail
        const removeOrg = this.props.organisation.organisation
        db.collection('organisations').doc(this.props.orgID).update({

            canView : firebase.firestore.FieldValue.arrayRemove(userEmail),
            admin : firebase.firestore.FieldValue.arrayRemove(userEmail),
            member : firebase.firestore.FieldValue.arrayRemove(userEmail)
            
        })
       

        // delete user from org

        db.collection("users").where('organisation', 'array-contains', removeOrg)
        .where('email', '==' , userEmail)
        .get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc) {
                    db.collection("users").doc(doc.id).update({
                    organisation : firebase.firestore.FieldValue.arrayRemove(removeOrg)
                 }) 
            })
        })

        //delete user from all projects contained in org
       
        db.collection("projects").where('organisation', '==', removeOrg)
        .where('canView', 'array-contains' , userEmail)
        .get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc) {
                
                    db.collection("projects").doc(doc.id).update({
                    canView : firebase.firestore.FieldValue.arrayRemove(userEmail),
                    admin : firebase.firestore.FieldValue.arrayRemove(userEmail),
                    member : firebase.firestore.FieldValue.arrayRemove(userEmail)
                 })

                 console.log('second pull = ' + doc.id, " => ", doc.data());
            })
        })

        //delete from all innerprojects
        db.collection("innerprojects").where('organisation', '==', removeOrg)
        .where('canView', 'array-contains' , userEmail)
        .get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc) {
                
                    db.collection("innerprojects").doc(doc.id).update({
                    canView : firebase.firestore.FieldValue.arrayRemove(userEmail),
                    admin : firebase.firestore.FieldValue.arrayRemove(userEmail),
                    member : firebase.firestore.FieldValue.arrayRemove(userEmail)
                 })

                 console.log('second pull = ' + doc.id, " => ", doc.data());
            })
        })

         //delete from all comments
         db.collection("comments").where('organisation', '==', removeOrg)
         .where('canView', 'array-contains' , userEmail)
         .get()
         .then(function(querySnapshot) { 
             querySnapshot.forEach(function(doc) {
                 
                     db.collection("comments").doc(doc.id).update({
                     canView : firebase.firestore.FieldValue.arrayRemove(userEmail),
                     admin : firebase.firestore.FieldValue.arrayRemove(userEmail),
                     member : firebase.firestore.FieldValue.arrayRemove(userEmail)
                  })
 
                  console.log('second pull = ' + doc.id, " => ", doc.data());
             })
         })
      


        //delete org from user account
        db.collection("users").where('email', '==', userEmail).get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc) {

                console.log(doc.id, " => ", doc.data());
                
                    db.collection("users").doc(doc.id).update({
                    organisation : ''
                 })

                 console.log('second pull = ' + doc.id, " => ", doc.data());
            })
        })
        })
        }


    render() {

        

        
 
        return(
                
               
                  
                  <button id={'button' + this.props.userEmail} onClick={this.handleDeleteUser} className="btn btn-primary delete-btn">Delete</button>
                    
                   
            
        )
    }
}





export default DeleteUser