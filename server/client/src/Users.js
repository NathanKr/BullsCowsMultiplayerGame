import React, { Component } from "react";

class Users extends Component {
  state = { userName: "" }; // -- represent also temp value

  render() {
    const elements = this.props.users.map(user => (
      <li key={user.id}>{user.name}</li>
    ));
    return (
      <>
        <h2>Users</h2>
        <ul>{elements}</ul>
        <input
          onChange={evt =>
            this.setState({  userName: evt.target.value })
          }
          placeholder="insert your user name"
        />
        <button
          onClick={() => {
            this.props.setUserNameHandler(this.state.userName);
          }}
        >
          Submit
        </button>
      </>
    );
  }
}

export default Users;
