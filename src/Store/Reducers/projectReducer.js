
const initState = {
   
  }

const projectReducer  = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            
            return state;
        case 'DELETE_PROJECT':
            console.log('Project Deleted', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('Create project error', action.err);
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('Delete project error', action.err);
            return state;
        default:
            return state;
    }
    
}

export default projectReducer