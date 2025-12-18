import '../App.css'
import Chuot, { DisplayArray } from '../service/chuot.jsx';
import { DisplayList } from '../service/chuotService.jsx';
import Music from "../service/music.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Home() {
  const [mode, setMode] = useState(null);
  const navigate = useNavigate();


  let chuot = null;

  if (mode === "single") chuot = <Chuot />;
  if (mode === "array") chuot = DisplayArray();
  if (mode === "list") chuot = <DisplayList />;

  return (
    <div className="App">
      <h1 style={{ color: "rgba(18, 110, 121, 1)" }}>
        Tôi là Lưu Văn Đông!
      </h1>
      <h2>donglv</h2>
      <p>Xin chào<br />Bạn khỏe chứ!</p>

      <div className="action-barBtn">
        <button onClick={() => setMode("single")}>1 con chuột</button>
        <button onClick={() => setMode("array")}>Array chuột</button>
        <button onClick={() => setMode("list")}>List chuột</button>
        <Music />

        <button onClick={() => navigate("/game")}>
          🎮 Chơi Game
        </button>
        <button onClick={() => navigate("/about")}>
          🔒 Bí mật của chuột
        </button>
        <button onClick={() => navigate("/login")}>
          Đăng nhập
        </button>
      </div>
      <div className="content">
        {chuot}
      </div>

      {mode && (
        <button onClick={() => setMode(null)}>
          Ẩn
        </button>
      )}
    </div>
  );
}

export default Home;
