
const initState = {
    projects: [
      {id: '1', title: 'help me find peach', content: 'blah blah blah'},
      {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
      {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
    ]
  }

const commentReducer  = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            console.log('Comment Created', action.comment);
            return state;
        case 'CREATE_COMMENT_ERROR':
            console.log('Create comment error', action.err);
            return state;
        default:
            return state;
    }
    
}

export default commentReducer