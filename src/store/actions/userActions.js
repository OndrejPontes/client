import axios from 'axios'
import Alert from 'react-s-alert'
import { loadQueries, RESET_QUERIES } from './queriesActions'

export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"
export const GET_USERS = "GET_USERS"
export const CHANGE_PERMISSIONS = "CHANGE_PERMISSIONS"

export function getCurrentUser() {
  return function (dispatch) {
    return axios.get('/api/current_user')
      .then(function (response) {
        // dispatch({type: ADD_USER, user: response.data})

        response.data && dispatch(loadQueries())
        if (response.data && response.data.is_admin) {
          // dispatch(getUsers())
        }
      })
  }
}

export function logout() {
  return function (dispatch) {
    return axios.delete('/api/logout')
      .then(function () {
        // dispatch({type: REMOVE_USER})

        // dispatch({type: RESET_QUERIES})
        window.location.replace("")
      })
      .catch(function (error) {
        Alert.error('Your logging out was unsuccessful. Error: ' + error)
      })
  }
}

export function getUsers() {
  return function (dispatch) {
    return axios.get('/api/users')
      .then(function (response) {
        // dispatch({type: GET_USERS, users: response.data})
      })
  }
}

export function changePermissions(id, isAdmin) {
  return function (dispatch) {
      dispatch({type: CHANGE_PERMISSIONS, id, isAdmin})

      return axios.put('/api/users/' + id, {is_admin: isAdmin})
      .then(function () {
        // dispatch({type: CHANGE_PERMISSIONS, id, isAdmin})

        Alert.success('Users permissions were changed.');
      })
      .catch(function (error) {
        Alert.error('Users permissions were not changed. Error: ' + error)
      })
  }
}