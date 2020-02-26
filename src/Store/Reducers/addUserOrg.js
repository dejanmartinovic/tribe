
const initState = {
    canView: []
  }

const addUserOrg  = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            console.log('User Created', action.project);
            return state;
        case 'CREATE_USER_ERROR':
            console.log('User Error', action.project);
            return state;
        default:
            return state;
    }
    
}

export default addUserOrg