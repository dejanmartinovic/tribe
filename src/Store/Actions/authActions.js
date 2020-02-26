export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }
  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
  
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email, 
        newUser.password
      ).then(response => {
        return firestore.collection('users').doc(response.user.uid).set({
          //single user
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          isOrg: newUser.isOrg,
          organisation: newUser.organisation
        });
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err});
      });
    }
  }

  export const signUpOrg = (newUserOrg) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
  
      firebase.auth().createUserWithEmailAndPassword(
        newUserOrg.email, 
        newUserOrg.password
      ).then(response => {
        return firestore.collection('users').doc(response.user.uid).set({
          //org user
          firstName: newUserOrg.orgFirstName,
          lastName: newUserOrg.orgLastName,
          isOrg: newUserOrg.isOrg,
          organisation: newUserOrg.organisation,
          email:newUserOrg.email
        });
      }).then(() => {
          return firestore.collection('organisations').add({
            organisation: newUserOrg.organisation,
            ownerEmail:newUserOrg.email,
            canEdit:[newUserOrg.email],
            canView: [newUserOrg.email],
            time: new Date(),
            admin:[newUserOrg.email],
            member:[newUserOrg.email]
          });
        }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS_ORG' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR_ORG', err});
      });
    }
  }
