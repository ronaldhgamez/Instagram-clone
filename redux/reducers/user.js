// here you have the states of the user
import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE } from '../constants/index'

const initialState = {
  currentUser: null,
  posts: []
}

// State is equal to initial state if no state is pass along in the function.
export const user = (state = initialState, action) => {

  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case USER_POST_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}