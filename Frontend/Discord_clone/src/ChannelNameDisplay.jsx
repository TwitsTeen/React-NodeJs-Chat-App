function ChannelNameDisplay({ channel = { name: "default name", id: 0 } }) {
  return (
    <div className="w-full text-gray-200 bg-gray-700 p-2  flex">
      {channel.name} <span className="font-bold ml-2">#{channel.id}</span>
    </div>
  );
}

export default ChannelNameDisplay;
