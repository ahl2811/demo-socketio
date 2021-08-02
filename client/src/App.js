import "./App.css";
import { useEffect, useState } from "react";
import socketClient from "socket.io-client";

const socket = socketClient.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [listChat, setListChat] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setListChat([...listChat, message]);
    });
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    //setListChat((state) => [...state, message]);
    setMessage("");
    socket.emit("chat message", message);
  };

  return (
    <div className="App">
      <ul className="messages">
        {listChat.length > 0
          ? listChat.map((mes, index) => <li key={index}>{mes}</li>)
          : "No message"}
      </ul>
      <form className="form" onSubmit={submitHandler}>
        <input
          className="input"
          autocomplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
