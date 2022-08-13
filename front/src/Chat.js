import React, { useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"

function Chat({ socket, username, Sala }) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        sala: Sala,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", messageData)
      setMessageList(list => [...list, messageData])
      setCurrentMessage("")
    }
  }

  useEffect(() => {
    socket.on("receive_message", data => {
      setMessageList(list => [...list, data])
    })
  }, [socket])

  return (
    <div className="chat-window">
      <div>
        <div className="chat-header">
          <p id="avatar">
            {" "}
            <span>Avatar</span>
          </p>
          <div id="chatOnline">
            <p id="titleChat">Live Chat</p>
            <p id="online">Online</p>
          </div>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map(messageContent => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Mensagem..."
            onChange={event => {
              setCurrentMessage(event.target.value)
            }}
            onKeyPress={event => {
              event.key === "Enter" && sendMessage()
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
