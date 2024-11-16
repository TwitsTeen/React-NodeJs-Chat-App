import { useState } from "react";

function LoginPage({ setIsLoggedIn, setUsernameGlobal, setPasswordGlobal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleConnect() {
    if (username.trim() !== "") {
      setUsernameGlobal(username);
      setPasswordGlobal(password);
      setIsLoggedIn(true);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen from-gray-700 to-secondary bg-gradient-to-tr bg-gray-500 ">
      <h1 className="text-center p-28 text-5xl ">Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="w-72 bg-gray-200 rounded-md m-6 p-3 text-center self-center"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="w-72 bg-gray-200 rounded-md m-6 p-3 text-center self-center"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-secondary w-72 p-3 rounded-lg border-2 border-black border-solid self-center mt-52 hover:shadow-md hover:shadow-secondary transition-all ease-linear"
        onClick={handleConnect}
      >
        Connect
      </button>
    </div>
  );
}

export default LoginPage;
