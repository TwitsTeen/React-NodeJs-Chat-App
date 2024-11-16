import { useState } from "react";
import PropTypes from "prop-types";
function ChatBar({ username, channel }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    const finalMessage = message;
    console.log(`Sending ${finalMessage}`);
    setMessage("");
    if (
      finalMessage.trim() !== "" &&
      username.trim() !== "" &&
      channel.id !== ""
    ) {
      try {
        const response = await fetch("http://localhost:3000/sendMessage", {
          method: "POST",
          body: JSON.stringify({
            author: username,
            content: finalMessage,
            channelId: "" + channel,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log("Message sent successfully:", data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Send a message"
        className="absolute bottom-10 z-50 left-80 w-[90rem] rounded-md bg-gray-500 text-white placeholder-gray p-2 "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button
        className="absolute bottom-9 right-20 bg-secondary p-3 border-2 border-solid border-primary rounded-md"
        onClick={sendMessage}
      >
        Send
      </button>
    </>
  );
}
ChatBar.propTypes = {
  username: PropTypes.string.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatBar;
