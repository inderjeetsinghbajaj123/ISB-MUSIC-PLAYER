import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import Like from "./components/Like";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-[#F3EFE5] text-[#263C32]">
        {/* Fixed sidebar */}
        <Sidebar />

        {/* Main content - sidebar offset applied only once */}
        <main className="min-h-screen min-w-0 w-full bg-[#F3EFE5] md:ml-[250px] md:w-[calc(100%-250px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/like" element={<Like />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
