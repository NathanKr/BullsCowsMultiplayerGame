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

<h2>Design considerations</h2>
<ul>
<li>Provide DAL for users \ rooms so one can change easyly underline layer : memory , file , mongodb , monsoose</li>
<li>DAL is implemented via promise to support async opeations such as access to DB or file</li>
<li>Any logic that can be on server should be there, this will allow the client to be mostly view so using web browser or native mobile or desktop as client will be easier</li>
</ul>



<h2>Points of interest</h2>
<ul>
<li>It is ready to be deployed to heroku (engines is needed ?)</li>
<li>write to socket is done via emit</li>
<li>read from socket is done via on</li>
<li>send to other beside sender is done via broadcast</li>
<li>send to room is done via to(room name)
<li>enter a room is done via join</li>
</ul>

<h2>Entities</h2>
<h3>Event name</h3>
event name is concatination of entity and operation e.g. create user will be UserCreate

<h3>Constraints</h3>
<ol>
<li>user name is unique</li>
<li>room name is unique</li>
</ol>

remarks : these constraints can be removed

<h3>User Entity</h3>
<table>
  <tr>
    <th>Operation</th>
    <th>Arguments</th>
    <th>Ack</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Create</td>
    <td>User name</td>
    <td>same as Room Create</td>
    <td>Create user</td> 
  </tr>
  <tr>
    <td>Delete</td>
     <td>User id</td>
     <td>same as Room Create</td>
    <td>Delete user</td> 
  </tr>
  <tr>
    <td>Get</td>
     <td>User id</td>
     <td>{user : user object , err : err description , "" if ok}</td>
    <td>Get user</td> 
  </tr>
  <tr>
    <td>GetAll</td>
    <td>None</td>
    <td>{users : array of user objects , err : err description , "" if ok}</td>
    <td>Get all users</td> 
  </tr>
</table>

<h3>Room Entity</h3>
This include : room , game and one or more uses - depend on the game
<table>
  <tr>
    <th>Operation</th>
    <th>Arguments</th>
    <th>Ack</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Create</td>
    <td>Room name , user id, game id</td>
    <td>{err : err description , "" if ok}</td>
    <td>Create new room</td> 
  </tr>
  <tr>
    <td>Join</td>
    <td>Room id , user id</td>
    <td>{err : err description , "" if ok}</td>
    <td>join room</td> 
  </tr>
  <tr>
    <td>Leave</td>
    <td>Room id , user id </td>
    <td>{err : err description , "" if ok}</td>
    <td>Leave room</td> 
  </tr>
  <tr>
    <td>Delete</td>
    <td>Room id</td>
    <td>same as Create</td>
    <td>Delete room</td> 
  </tr>
  <tr>
    <td>Get</td>
     <td>Room id</td>
     <td>{room : room object , err : err description , "" if ok}</td>
    <td>Get room</td> 
  </tr>
  <tr>
    <td>GetAll</td>
    <td>None</td>
    <td>{rooms : array of room objects , err : err description , "" if ok}</td>
    <td>Get All rooms</td> 
  </tr>
</table>

<h3>Game Entity</h3>
<table>
  <tr>
    <th>Operation</th>
    <th>Arguments</th>
    <th>Ack</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Create</td>
    <td>Game name</td>
    <td>same as Room Create</td>
    <td>Create a game</td> 
  </tr>
  <tr>
    <td>Delete</td>
    <td>Game id</td>
    <td>Same as Room Create</td>
    <td>Delete a game</td> 
  </tr>
  <tr>
    <td>Get</td>
     <td>Game id</td>
     <td>{game : game object , err : err description , "" if ok}</td>
    <td>Get game</td> 
  </tr>
  <tr>
    <td>GetAll</td>
    <td>None</td>
    <td>{games : array of game objects , err : err description , "" if ok}</td>
    <td>Get all games</td> 
  </tr>
</table>

<h3>BullsAndCows game Entity (inherit Game ?)</h3>
<table>
  <tr>
    <th>Operation</th>
     <th>Arguments</th>
     <th>Ack</th>
    <th>Description</th>
    <th>Issued by</th>
  </tr>
  <tr>
    <td>Start</td>
    <td>room id</td>
    <td>Same as Room Create</td>
    <td>Start the game. This looks like generic stuff, can i inherit this ??</td> 
    <td>Client</td>
  </tr>
  <tr>
    <td>GameIsOver</td>
    <td>room id</td>
<td>{winner : name of winner or "" for draw , err : err description , "" if ok}</td>
    <td>Get the game winner. This looks like generic stuff, can i inherit this ??</td> 
    <td>Server</td>
  </tr>
  <tr>
    <td>CreateGuess</td>
    <td>guess, user id , room id</td>
    <td>{err : err description , "" if ok}  </td>
    <td>create guess once per game</td>
    <td>Client</td>
</tr>
  <tr>
    <td>SubmitGuess</td>
    <td>guess, user id from , user id to , room id</td>
    <td>{bulls : #of bulls , cows : # of cows , err : err description , "" if ok}  </td>
    <td>submit guess from user targeting to user</td>
    <td>Client</td>
</tr>
<tr>
    <td>SetMaxTries</td>
    <td>room id</td>
    <td></td>
    <td></td>
    <td>client , server. first phase only server</td>
</tr>
<tr>
    <td>GetMaxTries</td>
    <td>room id</td>
    <td></td>
    <td></td>
    <td>client</td>
</tr>
<tr>
    <td>GetWordLength</td>
    <td>room id</td>
    <td></td>
    <td></td>
    <td>client</td>
</tr>
<tr>
    <td>SetWordLength</td>
    <td>room id</td>
    <td></td>
    <td></td>
    <td>client , server. first phase only server</td>
</tr>
<tr>
    <td>SetCurrentTry</td>
    <td>room id</td>
    <td></td>
    <td></td>
    <td>client , server. first phase only server</td>
</tr>
<tr>
    <td>GetCurrentTry</td>
    <td>room id</td>
    <td></td>
    <td></td>
    <td>client , server.</td>
</tr>
</table>


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