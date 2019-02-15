import React, { Component } from "react";

class Rooms extends Component {
  state = {
    rooms: [{ id: 1, name: "room1" }, { id: 2, name: "room2" }],
    room: ""
  };

  joinRoom = () => {
    this.props.socket.emit(
      "joinRoom",
      {
        room: this.state.room
      },
      ackData => {
        console.log("got ack from server : ", ackData);
        this.props.setUserHasEnterRoomHandler();
      }
    );
  };
  render() {
    const elements = this.state.rooms.map(room => (
      <li key={room.id}>{room.name}</li>
    ));
    const enterRoomElements = (
      <>
        <input
          onChange={evt =>
            this.setState({  room: evt.target.value })
          }
          placeholder="insert room name"
        />
        <button onClick={() => this.joinRoom(this.state.room)}>
          Join room
        </button>
      </>
    );
    return (
      <>
        <h2>Rooms</h2>
        <ul>{elements}</ul>
        {!this.props.userHasEnterRoom ? enterRoomElements : ""}
      </>
    );
  }
}

export default Rooms;
