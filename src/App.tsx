import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Chat from "./pages/Chat";
import ListBoard from "./pages/ListBoard"; // Import your PlayAudioPage component here
import Play from "./pages/Play.tsx";
import DashBoard from "./pages/DashBoard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list_board" element={<ListBoard />} />
        <Route path="/play" element={<Play />} />
        <Route
          path="/chat/:chat_id"
          element={<Chat description={"직설적인 피드백을 통한 냉철한 조언"} />}
        />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
