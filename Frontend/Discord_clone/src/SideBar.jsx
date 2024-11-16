import { FaFileImport, FaFileExport } from "react-icons/fa";
import SideBarIcon from "./SideBarIcon";

function sideBar() {
  function saveState() {
    fetch(`http://localhost:3000/save`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }
  function loadState() {
    fetch(`http://localhost:3000/load`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col shadow-lg color bg-primary text-gray-300 z-50">
      <SideBarIcon
        icon={<FaFileExport size="28" />}
        text="Save State"
        onClick={() => saveState()}
      />
      <SideBarIcon
        icon={<FaFileImport size="28" />}
        text="Load State"
        onClick={() => loadState()}
      />
    </div>
  );
}

export default sideBar;
