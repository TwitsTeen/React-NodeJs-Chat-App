import { useState } from "react";
import SideBar from "./SideBar";
import ChannelBar from "./ChannelBar";
import ChatViewer from "./ChatViewer";
import LoginPage from "./LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [channel, setChannel] = useState({ name: "Default Channel", id: 0 });

  if (isLoggedIn) {
    return (
      <div className="flex w-screen ">
        <SideBar />
        <ChannelBar setChannel={setChannel} />
        <ChatViewer username={username} channel={channel} />
      </div>
    );
  } else {
    return (
      <LoginPage
        setIsLoggedIn={setIsLoggedIn}
        setUsernameGlobal={setUsername}
        setPasswordGlobal={setPassword}
      />
    );
  }
}

export default App;
