import './main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Immutable from "immutable"
import immutableDev from "immutable-devtools"

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { syncHistoryWithStore } from "react-router-redux";
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Router, browserHistory, Route, IndexRoute } from "react-router";

import reducers from './store/reducers/reducers'

import Header from './components/header/Header'
import Queries from './components/queries/Queries'
import Keywords from './components/keywords/Keywords'
import Users from './components/users/Users'
import NotAvailable from './components/shared/NotAvailable'

import { getCurrentUser } from './store/actions/userActions'

let middleware = null

if (process.env.NODE_ENV === "production") {
    middleware = applyMiddleware(thunk)
} else {
    const logger = createLogger()
    middleware = applyMiddleware(thunk, logger)
    immutableDev(Immutable)
}

const store = createStore(
    reducers,
    middleware,
)

store.dispatch(getCurrentUser())

// Debug
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production") {
    window.store = store
}

const RouterApp = connect(state => ({isAdmin: state.user.is_admin}))(({ history, isAdmin }) => (
    <Router history={ history }>
        <Route path="/" component={ Header }>
            <IndexRoute component={ Queries }/>
            <Route path="keywords" component={ isAdmin ? Keywords : NotAvailable}/>
            <Route path="users" component={ isAdmin ? Users : NotAvailable}/>
        </Route>
    </Router>
))

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <RouterApp history={history}/>
    </Provider>,
    document.getElementById('root')
)
