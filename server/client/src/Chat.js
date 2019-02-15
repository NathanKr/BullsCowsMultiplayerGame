import React, { Component } from "react";

class Chat extends Component {
  state = { message: "" };

  clickHandler = () => {
    this.props.socket.emit(
      "createMessage",
      {
        from: this.props.userName,
        text: this.state.message
      },
      ackData => console.log("got ack from server : ", ackData)
    );
  };

  render() {
    const elements = this.props.messages.map((msg, index) => (
      <li key={index}>{msg}</li>
    ));
    return (
      <>
        <h2>Chat</h2>
        <input
          onChange={evt =>
            this.setState({ message: evt.target.value })
          }
        />
        <button onClick={this.clickHandler}>-></button>
        <ul>{elements}</ul>
      </>
    );  
  }
}

export default Chat;
