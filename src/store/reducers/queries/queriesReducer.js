import { List } from 'immutable'
import Query, { QUERY_TYPES } from "../../../containers/Query"
import Alert from 'react-s-alert';
import axios from 'axios'


import { ADD_QUERY, REMOVE_QUERY, UPDATE_QUERY, GET_QUERIES, RESET_QUERIES } from "../../actions/queriesActions"
import { and, or, not, leftBracket, rightBracket } from "./constQueries"
// import tempQueries from "./tempQueries"

// const INIT_STATE = List([and, or, not, leftBracket, rightBracket, ...tempQueries])
const INIT_STATE = List([and, or, not, leftBracket, rightBracket])

const queriesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_QUERY:
      Alert.success('Query with name "' + action.query.name + '" was created.');
      return state.push(action.convert ? new Query({
        id: action.query.id,
        name: action.query.name,
        value: action.query.value,
        type: action.query.items.length === 0 ? QUERY_TYPES.ELEMENTARY : QUERY_TYPES.COMPLEX,
        items: List(action.query.items.map(item => state.find(q => q.get('name') === item))),
      }) : action.query)
    case REMOVE_QUERY:
      if (![].concat.apply([], state.filter(query => query.get('name') !== action.query.get('name'))
          .map(query => query.get('items').map(item => item.get('name') === action.query.get('name')).toArray())
          .toArray()).some(value => value === true)) {
        axios.delete('/api/queries/' + action.query.get('id'))
          .then(function () {
            Alert.success('Query with name "' + action.query.get('name') + '" was removed.');
          })
        return state.remove(state.findIndex(query => query.get('name') === action.query.get('name')))
      }
      Alert.error('Query with name "' + action.query.get('name') + '" can not be removed, because it is used by other queries.');
      return state
    case UPDATE_QUERY:
      Alert.success('Query with name "' + action.query.get('name') + '" was update.');
      return state.set(state.findIndex(query => query.get('id') === action.query.get('id')), action.query)
    case GET_QUERIES:
      const queries = action.queries.sort((a, b) => {
        if (a.items.length <= 1 && b.items.length <= 1) {
          return 0
        }
        if (a.items.length <= 1 && b.items.length > 1 || a.items.length > 1 && b.items.length <= 1) {
          return a.items.length - b.items.length
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      })

      let newState = state

      for (let i = 0; i < queries.length; i++) {
        const query = queries[i]
        newState = newState.push(new Query({
          id: query.id,
          name: query.name,
          value: query.value,
          items: List(query.items.map(item => newState.find(s => s.get('name') === item))),
          created_at: new Date(query.created_at),
          updated_at: new Date(query.updated_at),
          type: query.items.length <= 1 ? QUERY_TYPES.ELEMENTARY : QUERY_TYPES.COMPLEX
        }))
      }

      return newState
    case RESET_QUERIES:
      return INIT_STATE
    default:
      return state
  }
}

export default queriesReducer
