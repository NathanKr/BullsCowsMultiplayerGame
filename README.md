<h2>Introduction</h2>
Game rooms using socket.io

<h2>Server</h2>
Node.js

<h2>Client</h2>
<ul>
<li>Browser - vanilla JS</li>
<li>View</li>
<ul>
<li>choose game room</li>
<li>send message to game : from , text</li>
</ul>
</ul>



<h2>Points of interest</h2>
<ul>
<li>It is ready to be deployed to heroku (engines is needed ?)</li>
<li>write to socket is done via emit</li>
<li>read from socket is done via on</li>
<li>enter a room is done via join</li>
</ul>

<h2>Socket.io Events</h2>
<table>
  <tr>
    <th>Name</th>
    <th>Issued on</th> 
    <th>Description</th>
  </tr>
  <tr>
    <td>connect</td>
    <td>new socket connection</td> 
    <td></td>
  </tr>
  <tr>
    <td>disconnect</td>
    <td>socket close</td> 
    <td></td>
  </tr>
</table>

<h2>Custom Events</h2>
<table>
  <tr>
    <th>Name</th>
    <th>Issued by</th> 
    <th>Description</th>
    <th>Arguments</th>
  </tr>
  <tr>
    <td>newMessage</td>
    <td>server</td> 
    <td>general message used to
    <ul>
    <li>broadcast about new user enter game room - on connect event</li>
    <li>broadcast about new user exit game room - on disconnect event</li>
    <li>broadcast createMessage</li>
    </ul>
     </td>
     <td></td>
  </tr>
  <tr>
    <td>joinRoom</td>
    <td>client</td> 
    <td>request to join a room</td>
    <td>room name , user name</td>
  </tr>
  <tr>
    <td>createMessage</td>
    <td>client</td> 
    <td>general message used for game : from , text</td>
    <td></td>
  </tr>
</table>


<h2>Future</h2>
<ul>
<li>Add styling</li>
<li>Add authentication ??</li>
<li>Add message time to messages view</li>
<li>Add status + error description to ackCallback .client should respond accordingly </li>
<li>Show list of all users in the game (require storage e.g. file or db) 
</ul>