

export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const createdAt = new Date();
        const convertedDate = createdAt.toLocaleTimeString('it-it');
        const printFirstName = profile.isOrg === true ? profile.firstName : profile.firstName;
        const printLastName = profile.isOrg === true ? profile.lastName : profile.lastName;
        var projectId = authorId + convertedDate + project.title;
        projectId = projectId.replace(/[^a-zA-Z0-9]/g,'_');
        const orgName = profile.organisation ? profile.organisation : '';
       
        //this.state.project.createdAt.toDate().toLocaleTimeString('it-it') + this.state.project.title
        

        firestore.collection('projects').doc(projectId).set({
            ...project,
            authorFirstName: printFirstName,
            authorLastname: printLastName,
            authorID: authorId,
            authorEmail: profile.email,
            canView:project.canView,
            canEdit: [profile.email],
            createdAt: createdAt,
            projectID: projectId,
            organisation: orgName,
            permalink: '/project/' + projectId,
            projectAmount: 0,
            commentAmount: 0,
            total: 0,
        })
//
        
    }
};

export const deleteProject = (projectToDelete) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('projects').doc(projectToDelete).delete()
        
        .then(() => {
            dispatch({ type: 'DELETE_PROJECT'});
        }).catch((err) => {
            dispatch({ type: 'DELETE_PROJECT_ERROR', err});
        })

        
    }
};

//inner projects
export const createInnerProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();

        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const createdAt = new Date();
        const convertedDate = createdAt.toLocaleTimeString('it-it');
        var innerProjectId = authorId + convertedDate + project.title;
        innerProjectId = innerProjectId.replace(/[^a-zA-Z0-9]/g,'_');
        const printFirstName = profile.isOrg === true ? profile.firstName : profile.firstName;
        const printLastName = profile.isOrg === true ? profile.lastName : profile.lastName;

        firestore.collection('innerprojects').doc(innerProjectId).set({
            ...project,
            authorFirstName: printFirstName,
            authorLastname: printLastName,
            authorID: authorId,
            authorEmail: profile.email,
            createdAt: new Date(),
            innerProjectId : innerProjectId,
            permalink: '/thread/' + innerProjectId
            


        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project});
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err});
        })

        
    }
};

// delete inner project

export const deleteInnerProject = (projectToDelete) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('innerprojects').doc(projectToDelete).delete()
        
        .then(() => {
            dispatch({ type: 'DELETE_PROJECT'});
        }).catch((err) => {
            dispatch({ type: 'DELETE_PROJECT_ERROR', err});
        })

        
    }
};

export const deleteComment = (commentToDelete) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('comments').doc(commentToDelete).delete()
        
        .then(() => {
            dispatch({ type: 'DELETE_PROJECT'});
        }).catch((err) => {
            dispatch({ type: 'DELETE_PROJECT_ERROR', err});
        })

        
    }
};