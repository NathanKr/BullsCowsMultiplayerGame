import React, { Component } from "react";
import Users from "./Users";
import Rooms from "./Rooms";
import Game from "./Game";
import Chat from "./Chat";
import "./App.css";
import openSocket from "socket.io-client";

class App extends Component {
  state = {
    users: [{ id: 1, name: "avi" }, { id: 2, name: "moshe" }],
    messages: [], // --- handled here because Chat is not displayed all the time
    userHasEnterRoom: false,
    socket: null,
    userName: "xxx"
  };

  addMessageFromServer = msg => {
    const messages = [...this.state.messages, msg];
    this.setState({ messages });
  };

  setUserHasEnterRoomHandler = () => {
    this.setState({  userHasEnterRoom: true });
  };

  setUserNameHandler = userName => {
    this.setState({  userName });
  };

  componentDidMount() {
    const socket = openSocket("http://localhost:5000");
    this.setState({ socket });

    socket.on("connect", () => {
      console.log("client connected to server");
    });

    socket.on("newMessage", ({ text, from }) => {
      console.log("got newMessage event from server : ", text, from);
      this.addMessageFromServer(`${from} -> ${text}`);
    });

    socket.on("disconnect", () => console.log("socket disconnected"));
  }

  render() {
    const gameAndChat = this.state.userHasEnterRoom ? (
      <div>
        <Game />
        <Chat
          messages={this.state.messages}
          socket={this.state.socket}
          userName={this.state.userName}
        />
      </div>
    ) : (
      ""
    );

    const userAndRooms = !this.state.userHasEnterRoom ? (
      <div>
        <Users
          users={this.state.users}
          setUserNameHandler={this.setUserNameHandler}
        />
        <Rooms
          socket={this.state.socket}
          setUserHasEnterRoomHandler={this.setUserHasEnterRoomHandler}
          userHasEnterRoom={this.state.userHasEnterRoom}
        />
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
