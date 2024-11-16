function ChannelName({ name = "default channel name", id, onClick }) {
  const deleteChannel = async () => {
    await fetch(`http://localhost:3000/deleteChannel/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        fetchChannels();
      } else {
        return;
      }
    });
  };

  return (
    <div className="flex">
      <span
        className="text-center m-2 pl-3 font-sans font-semibold hover:bg-gray-500 cursor-pointer contrast-25 rounded-md transition-all  ease-linear flex  w-3/4"
        onClick={onClick}
      >
        {name}
      </span>
      <button
        className="w-8 h-6 bg-red-500 m-2 ml-4"
        onClick={() => deleteChannel()}
      >
        x
      </button>
    </div>
  );
}

export default ChannelName;
