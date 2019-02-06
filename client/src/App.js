import React, { Component } from "react";
import Users from "./Users";
import Rooms from "./Rooms";
import Game from "./Game";
import Chat from "./Chat";
import "./App.css";

class App extends Component {
  state = {
    users: [{ id: 1, name: "avi" }, { id: 2, name: "moshe" }],
    rooms: [{ id: 1, name: "room1" }, { id: 2, name: "room2" }],
    userHasEnterRoom: true
  };
  render() {
    const gameAndChat = this.state.userHasEnterRoom ? (
      <div>
        <Game />
        <Chat />
      </div>
    ) : (
      ""
    );

    const userAndRooms = !this.state.userHasEnterRoom ? (
      <div>
        <Users users={this.state.users} />
        <Rooms rooms={this.state.rooms} />
      </div>
    ) : (
      ""
    );
    return (
      <div className="App">
        {gameAndChat}
        {userAndRooms}
      </div>
    );
  }
}

export default App;
