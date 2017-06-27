import React, { Component } from "react"
import { connect } from "react-redux"
import SwitchButton from 'react-switch-button';

import { changePermissions } from "../../store/actions/userActions"

class Users extends Component {
  render() {
    return (
      <div className="users">
        {this.props.users.map((user, index) =>
          <div key={index}>
            <div>{user.name}</div>
            <SwitchButton
              name={"switch" + index}
              label="User"
              labelRight="Admin"
              defaultChecked={user.is_admin}
              disabled={this.props.currentUser.name === user.name}
              onChange={() => {
                this.props.dispatch(changePermissions(user.id, !user.is_admin))
              }}
            />
          </div>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  users: state.user.users,
  currentUser: state.user,
}))(Users)