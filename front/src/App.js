import "./App.css"
import io from "socket.io-client"
import { useState, useEffect } from "react"
import Chat from "./Chat"

const socket = io.connect("http://localhost:3001")

function App() {
  const user = {
    username: "",
    idSala: ""
  }

  const [form, setForm] = useState(user)
  const [showChat, setShowChat] = useState(false)
  const [userOnline, setUserOnline] = useState([])

  const EnterSala = () => {
    if (form.username !== "" && form.idSala !== "") {
      socket.emit("entrar_sala", form)
      setShowChat(true)
    }
  }
  const changeHandler = event => {
    let currentUser = { ...form }
    let name = event.target.getAttribute("name")
    let value = event.target.value
    if (name) {
      currentUser[name] = value
      setForm(currentUser)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div id="containerChat">
          <div className="joinChatContainer">
            <h3>Log in Chat</h3>
            <input
              name="username"
              type="text"
              placeholder="Seu Nome..."
              onChange={changeHandler}
            />
            <input
              name="idSala"
              type="text"
              placeholder="ID da Sala..."
              onChange={changeHandler}
            />
            <button onClick={EnterSala}>Log in</button>
          </div>
        </div>
      ) : (
        <Chat
          socket={socket}
          userOnline={userOnline}
          username={form.username}
          Sala={form.idSala}
        />
      )}
    </div>
  )
}

export default App
