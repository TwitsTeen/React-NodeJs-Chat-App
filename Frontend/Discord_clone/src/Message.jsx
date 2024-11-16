function Message({ message = "Default Message", author = "Default Author" }) {
  return (
    <div className="text-gray-200 m-1 p-2 hover:bg-gray-700">
      <div className="text-black mb-2">{author}</div>
      <div> {message}</div>
    </div>
  );
}

export default Message;
