import React from "react";

function Users({users}) {
  const elements = users.map(user => <li>{user.name}</li>);  
  return <>
      <h2>Users</h2>
      <ul>{elements}</ul>
      <input placeholder="insert your user name"/><button>Submit</button>
  </>;
}

export default Users;
