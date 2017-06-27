import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import Alert from 'react-s-alert';

import { login, logout } from "../../store/actions/userActions"

class Header extends Component {

  componentDidMount()
  {
    if(!document.getElementsByClassName('link active')) {
      document.getElementById('queriesLink').classList.add('active')
    }
  }

  render() {
    const {dispatch, user} = this.props;

    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse" id="header">
          <div className="container">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
            <a className="navbar-brand" href="#" id="brand">ABSB</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <Link to="/" className="link" id="queriesLink"
                      onClick={() => document.getElementById('queriesLink').classList.add('active')}>
                  Queries
                </Link>
                {
                  user.is_login && user.is_admin &&
                  <div className="link">
                    <Link to="/keywords" className="link" activeClassName="active"
                          onClick={() => document.getElementById('queriesLink').classList.remove('active')}>
                      Keywords
                    </Link>
                    <Link to="/users" className="link" activeClassName="active"
                          onClick={() => document.getElementById('queriesLink').classList.remove('active')}>
                      Users
                    </Link>
                  </div>
                }
              </ul>
              { this.props.user.is_login
                ? <div>
                  <div id="userName">{this.props.user.name}</div>
                  <button className="btn btn-outline-danger my-2 my-sm-0" id="logout"
                               onClick={() => dispatch(logout())}>Logout</button>
                </div>
                : <button className="btn btn-outline-success my-2 my-sm-0" id="login"
                          onClick={() => window.location.replace("auth/linkedin")}>Login</button>
              }
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
        <Alert stack={{limit: 4}} timeout={3000} position="bottom-right" effect="jelly" beep={false}/>
      </div>
    )
  }
}

export default connect(state => ({user: state.user}))(Header)