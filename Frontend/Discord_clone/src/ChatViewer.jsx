import Message from "./Message";
import ChatBar from "./ChatBar";
import { useState, useEffect } from "react";
import ChannelNameDisplay from "./ChannelNameDisplay";

function ChatViewer({ username, channel = { id: 1, name: "default" } }) {
  const [messages, setMessages] = useState([
    { content: "Message 1", author: "Author 1" },
  ]);

  function fetchMessages() {
    fetch(`http://localhost:3000/messages/${channel.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 1000); // Polling every 1 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [channel]); // Adding channel as a dependency

  return (
    <div className="flex-1 h-screen bg-gray-600 flex flex-col ml-72 ">
      <ChannelNameDisplay channel={channel} />
      <div className="overflow-auto h-[53rem] ">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.content}
            author={message.author}
            className="overflow-scroll"
          />
        ))}
      </div>
      <ChatBar username={username} channel={channel.id} />
    </div>
  );
}

export default ChatViewer;
