import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Chat from "./pages/Chat";
import ListBoard from "./pages/ListBoard";
import PlayAudioPage from "./components/PlayAudioPage"; // Import your PlayAudioPage component here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list_board" element={<ListBoard />} />
        <Route path="/chat/:chat_id" element={<Chat
          name={"Andrew Park"}
          description={"직설적인 피드백을 통한 냉철한 조언"}
          image={"https://i.ibb.co/hFy5Cbz/2024-07-02-4-08-52.png"}
        />} />
        <Route path="/play" element={<PlayAudioPage />} /> {/* Define the /play route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
