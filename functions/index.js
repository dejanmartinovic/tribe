const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');

admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


const createNotification = (notification => {
    return admin.firestore().collection('notifications').doc(notification.id)
    .set(notification)
})



exports.projectCreated = functions.firestore
.document('projects/{projectId}')
.onCreate( doc => {
    const project = doc.data();
    var canView = project.canView.filter(function(item){
        return item !== project.authorEmail
    });
    const emailLink = 'https://mytribe.solutions' + project.permalink;
    const notification = {
        content: 'New project created',
        title: `${project.title}`,
        user: `${project.authorFirstName} ${project.authorLastname}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        id: `${doc.id}`,
        canView: canView,
        permalink: `${project.permalink}`,
        author: project.authorEmail
    }

    admin.firestore().collection('mail').add({
        to: canView,
        message: {
          from: 'Tribe',
          subject: 'New Project ' + project.title,
          text: 'New project added',
          html: '<div style="width:320px;border:1px solid #000;margin:20px;padding:20px;text-align:center;">'+
                '<img src="https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/website-files%2Ftribe-logo.svg?alt=media&token=d1d55ec0-f3ab-4537-b558-8837e4676056" alt=""/>'
                 + '<br />' +
                 '<h2>A new project has been added to your Tribe</h2>'
                 + '<a href="'+ emailLink +'">Click Here To View</a>'
                 +'</div>'
                
        }
      })

    return createNotification(notification);

});



exports.commentCreated = functions.firestore
.document('comments/{commentId}')
.onCreate( doc => {
    const comment = doc.data();
   
    const emailLink = 'https://mytribe.solutions/thread/' + comment.projectId;
  
    var canView = comment.canView.filter(function(item){
        return item !== comment.commentAuthor
    });
    const notification = {
        content: 'New comment',
        user: `${comment.authorFirstName} ${comment.authorLastname}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        id: `${doc.id}`,
        permalink: '/thread/' + `${comment.projectId}`,
        canView: canView,
        author: comment.commentAuthor
    }
   

    admin.firestore().collection('mail').add({
        to: canView,
        message: {
          from: 'Tribe',
          subject: 'New comment by ' + comment.commentAuthor,
          text: 'New comment',
          html: '<div style="width:320px;border:1px solid #000;margin:20px;padding:20px;text-align:center;">'+
                '<img src="https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/website-files%2Ftribe-logo.svg?alt=media&token=d1d55ec0-f3ab-4537-b558-8837e4676056" alt=""/>'
                 + '<br />' +
                 '<h2>Comment created on '+ comment.currentProjectTitle +'</h2>' +
                 '<p>By: '+comment.commentAuthor+'</p>' +
                 '<p>' + comment.createdAt.toDate().toDateString() + ' ' +
                 comment.createdAt.toDate().toLocaleTimeString('en-US', {
                    hour12: true,
                    formatMatcher: 'best fit' ,
                    minute: 'numeric',
                    hour: 'numeric'
                    
                 }) + 
                 
                 '</p>' +
                '<a href="'+ emailLink +'">Click Here To View</a>'
                 +'</div>'
                
        }
      })

    return createNotification(notification);

});

exports.innerProjectCreated = functions.firestore
.document('innerprojects/{innerprojectsId}')
.onCreate( doc => {
    
    const innerproject = doc.data();
    if(i =1 ) {
        
    }
    const emailLink = 'https://mytribe.solutions/project/' + innerproject.projectId;
    var canView = innerproject.canView.filter(function(item){
        return item !== innerproject.authorEmail
    });
    const notification = {
        content: 'New thread created',
        title: `${innerproject.title}`,
        user: `${innerproject.authorFirstName} ${innerproject.authorLastname}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        id: `${doc.id}`,
        permalink: `${innerproject.permalink}`,
        canView: canView,
        author: innerproject.authorEmail
    }

    admin.firestore().collection('mail').add({
        to: canView,
        message: {
          from: 'Tribe',
          subject: 'New Thread ' + innerproject.title,
          text: 'New thread added',
          html: '<div style="width:320px;border:1px solid #000;margin:20px;padding:20px;text-align:center;">'+
                '<img src="https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/website-files%2Ftribe-logo.svg?alt=media&token=d1d55ec0-f3ab-4537-b558-8837e4676056" alt=""/>'
                 + '<br />' +
                 '<h2>A new thread has been added to project: '+innerproject.projectTitle+'</h2>' +
                 '<p>New thread title: '+ innerproject.title +'</>' +
                 '<p>By: '+innerproject.authorEmail+'</p>' +
                 '<p>' + innerproject.createdAt.toDate().toDateString() + ' ' +
                 innerproject.createdAt.toDate().toLocaleTimeString('en-US', {
                    hour12: true,
                    formatMatcher: 'best fit' ,
                    minute: 'numeric',
                    hour: 'numeric'
                    
                 }) + 
                 
                 '</p>' +
                 '<a href="'+ emailLink +'">Click Here To View</a>'
                  +'</div>'
                
        }
      })

    return createNotification(notification);

});

exports.userJoined = functions.auth.user()
.onCreate( user => {

    return admin.firestore().collection('users')
    .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        //if statement here to change users name for org
        //const isOrgFirstName = newUser.isOrg === false ? newUser.firstName : newUser.orgFirstName;
        const notification = {
            content: 'User Joined',
            user: `${newUser.orgFirstName} ${newUser.orgLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        newUser.isOrg === true ?
        notification.user = `${newUser.orgFirstName} ${newUser.orgLastName}` : 
        notification.user = `${newUser.firstName} ${newUser.lastName}`

        const userToEmail = `${newUser.email}`;

        //send email notification to new user
        admin.firestore().collection('mail').add({
            to: userToEmail,
            message: {
              subject: 'Welcome to Tribe!',
              text: 'Thank you for signing up to Tribe',
              html: 'This is the <code>HTML</code> section of the email body.',
            }
          }).then(() => console.log('Queued email for delivery!'));

        return createNotification(notification);

    })
});

exports.userAddedToOrgEmail = functions.firestore
.document('organisation/{organisationId}')
.onWrite((change) => {
    const newValue = change.after.data();
     var projectAmount = newValue.projectAmount;
     var commentAmount = newValue.commentAmount;
    // var totalEntries = projectAmount + commentAmount;
    const notification = {
        projects: projectAmount,
        comments: commentAmount,
        total: projectAmount + commentAmount
    }

    return admin.firestore().collection("projects").doc(newValue.projectID).update({                    
        totalEntries : notification.total
    })
     
});









