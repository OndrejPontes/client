import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import queries from "./queries/queriesReducer"
import user from "./usersReducer"

export default combineReducers({
  queries,
  user,
  routing,
})
