// Reducers are to store the states of the applications or components

import { combineReducers } from "redux";
import {user}  from './user'

const Reducers = combineReducers({
  userState: user
})

export default Reducers;