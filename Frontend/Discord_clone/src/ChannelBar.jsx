import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChannelName from "./ChannelName";
import CreateChannel from "./CreateChannel";

function ChannelBar({ setChannel }) {
  const [channels, setChannels] = useState([]);

  const fetchChannels = () => {
    //console.log("Gettings channels");
    fetch("http://localhost:3000/channels")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setChannels(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  };

  useEffect(() => {
    fetchChannels();

    const interval = setInterval(fetchChannels, 1000); // Polling every 1 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="fixed top-0 left-16 h-screen w-56 shadow-lg color bg-gray-700 text-gray-300 flex flex-col z-40 overflow-auto">
      <CreateChannel fetchChannels={fetchChannels} />
      {channels.map((channel, index) => (
        <ChannelName
          name={channel.name}
          key={index}
          onClick={() => {
            setChannel(channel);
          }}
          fetchChannels={fetchChannels}
          id={channel.id}
        />
      ))}
    </div>
  );
}
ChannelBar.propTypes = {
  setChannel: PropTypes.func.isRequired,
};

export default ChannelBar;
