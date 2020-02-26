import authReducer from './authReducer'
import projectReducer from './projectReducer'
import authReducerOrg from './authReducerOrg'
import commentReducer from './commentReducer'
import addUserOrg from './addUserOrg'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    authOrg: authReducerOrg,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    comment: commentReducer,
    addUserOrg: addUserOrg
    
});

export default rootReducer



// the key name will be the data property on the state object