import React from 'react';

function Rooms({rooms}) {
    const elements = rooms.map(room => <li>{room.name}</li>);  
    return <>
        <h2>Rooms</h2>
        <ul>{elements}</ul>
        <input placeholder="insert room name"/><button>Join room</button>
    </>;
  }
export default Rooms;