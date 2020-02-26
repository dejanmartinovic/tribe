export const createComment = (comment) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();

        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const createdAt = new Date();
        const convertedDate = createdAt.toLocaleTimeString('it-it');
        const commentId = authorId + convertedDate + Math.random();
        const printFirstName = profile.isOrg === true ? profile.firstName : profile.firstName;
        const printLastName = profile.isOrg === true ? profile.lastName : profile.lastName;

        firestore.collection('comments').add({
            ...comment,
            authorFirstName: printFirstName,
            authorLastname: printLastName,
            authorID: authorId,
            createdAt: new Date(),
            commentId: commentId
        }).then(() => {
            dispatch({ type: 'CREATE_COMMENT', comment});
        }).catch((err) => {
            dispatch({ type: 'CREATE_COMMENT_ERROR', err});
        })

        
    }
};