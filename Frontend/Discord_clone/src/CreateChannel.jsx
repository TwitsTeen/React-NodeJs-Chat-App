import { useState } from "react";

function CreateChannel({ fetchChannels }) {
  const [channelName, setChannelName] = useState("");

  const handleCreateChannel = async () => {
    await fetch("http://localhost:3000/createChannel", {
      method: "POST",
      body: JSON.stringify({
        channelName: channelName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        response.json();
        setChannelName("");
        console.log("Channel name :" + channelName);
      })
      .then((data) => {
        fetchChannels();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <input
      type="text"
      placeholder="New Channel"
      value={channelName}
      onChange={(e) => setChannelName(e.target.value)}
      className="bg-gray-700 m-4 mb-10 border-secondary border-2 boder-solid p-2 rounded-md placeholder:text-center"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleCreateChannel();
        }
      }}
    />
  );
}

export default CreateChannel;
