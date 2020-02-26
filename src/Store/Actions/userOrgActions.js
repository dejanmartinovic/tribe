

export const createUser = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();

        firestore.collection('organisations').doc(user.docID).update({

            canView: firestore.FieldValue.arrayUnion(user.email),
            member : firestore.FieldValue.arrayUnion(user.email)
            
        }).then(() => {
            dispatch({ type: 'CREATE_USER', user});
        }).catch((err) => {
            dispatch({ type: 'CREATE_USER_ERROR', err});
        })

        
    }
};

//delete



// export const deleteUser = (userToDelete) => {
//     return (dispatch, getState, {getFirebase, getFirestore}) => {
//         // make async call to database
//         const firestore = getFirestore();
//         firestore.collection('organisations').doc(userToDelete.orgID).update({

//             canView: firestore.FieldValue.arrayRemove(userToDelete.userEmail)
            
//         })

       

//     }
// };