import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore';



class UserRole extends Component {
    state = {
        userEmail: this.props.userEmail,
        orgID: this.props.orgID
    }

    handleChange = (e) => {
        console.log(e.target.value)
        var userEmail = this.props.userEmail
        var option = e.target.value;

        var db = firebase.firestore();
       
        if ( option === 'Admin'){
            db.collection('organisations').doc(this.props.orgID).update({

                admin: firebase.firestore.FieldValue.arrayUnion(this.props.userEmail),
                member: firebase.firestore.FieldValue.arrayRemove(this.props.userEmail)
            }).then(() => {
                alert(this.props.userEmail + ' is now an admin');
              })
            //add to all projects within this org
            db.collection("projects").where('organisation', '==', this.props.organisation.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("projects").doc(doc.id).update({ 
                            admin : firebase.firestore.FieldValue.arrayUnion(userEmail),
                            member: firebase.firestore.FieldValue.arrayRemove(userEmail)
                        })
                    })
                });
                db.collection("innerprojects").where('organisation', '==', this.props.organisation.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("innerprojects").doc(doc.id).update({ 
                            admin : firebase.firestore.FieldValue.arrayUnion(userEmail),
                            member: firebase.firestore.FieldValue.arrayRemove(userEmail)
                        })
                    })
                });
                db.collection("comments").where('organisation', '==', this.props.organisation.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("comments").doc(doc.id).update({ 
                            admin : firebase.firestore.FieldValue.arrayUnion(userEmail),
                            member: firebase.firestore.FieldValue.arrayRemove(userEmail)
                        })
                    })
                });
        }else if (option === 'Member'){
            db.collection('organisations').doc(this.props.orgID).update({

                member: firebase.firestore.FieldValue.arrayUnion(this.props.userEmail),
                admin: firebase.firestore.FieldValue.arrayRemove(this.props.userEmail)
                
            }).then(() => {
                alert(this.props.userEmail + ' is now a member');
              })
             //add to all projects within this org
             db.collection("projects").where('organisation', '==', this.props.organisation.organisation).get()
             .then(function(querySnapshot) { 
                 querySnapshot.forEach(function(doc) {
                     
                     db.collection("projects").doc(doc.id).update({
                         
                         member : firebase.firestore.FieldValue.arrayUnion(userEmail),
                         admin: firebase.firestore.FieldValue.arrayRemove(userEmail)

                     })
                 })
             });
             db.collection("innerprojects").where('organisation', '==', this.props.organisation.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("innerprojects").doc(doc.id).update({ 
                            member : firebase.firestore.FieldValue.arrayUnion(userEmail),
                            admin: firebase.firestore.FieldValue.arrayRemove(userEmail)
                        })
                    })
                });
                db.collection("comments").where('organisation', '==', this.props.organisation.organisation).get()
                .then(function(querySnapshot) { 
                    querySnapshot.forEach(function(doc) {
                        
                        db.collection("comments").doc(doc.id).update({ 
                            admin : firebase.firestore.FieldValue.arrayRemove(userEmail),
                            member: firebase.firestore.FieldValue.arrayUnion(userEmail)
                        })
                    })
                });
                
        }
       
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

            canView: firebase.firestore.FieldValue.arrayRemove(userEmail)
            
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

                console.log(doc.id, " => ", doc.data());
                
                    db.collection("projects").doc(doc.id).update({
                    canView : firebase.firestore.FieldValue.arrayRemove(userEmail)
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
        var db = firebase.firestore();
        var docRef = db.collection('organisations').doc(this.props.orgID);
        var userEmailRef = this.props.userEmail;
        var ownerEmail = this.props.organisation.ownerEmail;
        
        docRef.get().then(function(doc) {

            if (doc.exists) {
                var data = doc.data();
                console.log("Document data:", data.member);
                if (data.admin.includes(userEmailRef)){
                    document.getElementById(userEmailRef).innerHTML = "Admin";
                }
            } 
            if (data.member.includes(userEmailRef)){
                document.getElementById(userEmailRef).innerHTML = "Member";
            }

            console.log('userEmailRef = ' + userEmailRef)
            console.log('owner email = ' + ownerEmail)
            if (userEmailRef === ownerEmail) {
                document.getElementById(userEmailRef).innerHTML = "Owner";

                //disable drop down if owner
                document.getElementById('inputGroupSelect04').disabled = true; 
                //disable delete if owner
                document.getElementById('button' + userEmailRef).disabled = true; 

            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        
          
        return(
                
             
            <div class="input-group user-list" key={this.props.userEmail}>
            <select class="custom-select" id="inputGroupSelect04" onChange={this.handleChange}  key={this.props.userEmail}>
              <option id={this.props.userEmail} selected></option>
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
          </div> 
        //  <button onClick={this.handleDeleteUser} className="btn btn-primary delete-btn">Delete</button>
                    
                   
            
        )
    }
}





export default UserRole