import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/firestore';
//import {Link} from 'react-router-dom'


class MyDetails extends Component {
    state = {
        avatar: ""
    }

    fileUpload() {
        document.getElementById('single').click()
    }

    onChange = (e) => {
        var userEmail = this.props.profile.email
       const files = Array.from(e.target.files)
       const fileToUpload = files[0];
        console.log(fileToUpload)
        var storageRef = firebase.storage().ref('profile/' + userEmail);

        storageRef.put(fileToUpload).then(downloadURL => {
            alert("Avatar Updated!");
            this.setState({
                avatar : downloadURL.ref.location.path_
            })
            console.log(this.state.avatar)
        })
        var db = firebase.firestore();
        db.collection("users").where("email", "==", userEmail)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                // Build doc ref from doc.id
                db.collection("users").doc(doc.id).update({
                    avatarURL: 'https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/profile%2F'+ userEmail +'?alt=media&token=3c87165c-ba82-47a0-a7d9-ff685c3dfe28'});
            });
        }).then(doc => {
            window.location.reload();
        })

        
    }

    handleLeaveOrg = (e) => {
        var db = firebase.firestore();
        var userEmail = this.props.profile.email
        e.preventDefault(); 
        alert('Are you sure you want to leave?');
        //remove from users db
        db.collection("users").where("email", "==", this.props.profile.email)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                // Build doc ref from doc.id
                db.collection("users").doc(doc.id).update({
                    organisation: ""});
            });
        })
        //remove from organisation db

        db.collection("organisations").where("organisation", "==", this.props.profile.organisation)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                // Build doc ref from doc.id
                db.collection("organisations").doc(doc.id).update({
                    member: firebase.firestore.FieldValue.arrayRemove(userEmail),
                    admin: firebase.firestore.FieldValue.arrayRemove(userEmail),
                    canView: firebase.firestore.FieldValue.arrayRemove(userEmail)
                
                });
            });
        })

        //remove user from all projects
        db.collection("projects").where('organisation', '==', this.props.profile.organisation)
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
    }
    
    render() {
        
        const {profile} = this.props;

        var background = profile.avatarURL


        if(!background) {
            background = 'https://static.thenounproject.com/png/4815-200.png'
        }
        var profileImage = {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }

        var singleUser = 'Lone Wolf (not in an orgainisation)';
        var inOrgUser = 'Tribe Member (' + profile.organisation + ')'
        
        return (

            

            <div className="row">
                <div className="col-md-12">
                    <h3>Your Account</h3>
                </div>
                <div className="col-md-12 account-main-content">
                    <div className="row">
                        <div className="col-md-6">
                            <p>Name:<br></br>
                            {profile.firstName + ' ' + profile.lastName}</p>
                            <p>Email<br></br>
                            {profile.email}</p>
                            <p>Account Type:<br></br>
                            {profile.organisation ? inOrgUser  : singleUser }</p>
                        </div>
                        <div className="col-md-6">
                            <p>Avatar (Click to edit)</p>
        
                            
                            <div style={profileImage} onClick={this.fileUpload} className="profile-picture account-avatar">
                            <input type='file' id='single' onChange={this.onChange} /> 
                            </div>
                    </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-12">
                        <button onClick={this.handleLeaveOrg} className="btn btn-primary" >Leave Org</button>
                    </div>
                </div> */}
                
                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(MyDetails)
