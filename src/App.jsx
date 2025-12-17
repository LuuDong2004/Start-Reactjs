import './App.css'
import Chuot, { DisplayArray } from './service/chuot.jsx';
import { DisplayList } from './service/chuotService.jsx';
import { useState } from "react";
import Music from "./service/music.jsx";

const VIEW = {
  NONE: "NONE",
  SINGLE: "SINGLE",
  ARRAY: "ARRAY",
  LIST: "LIST",
};

function App() {
  const [view, setView] = useState(VIEW.NONE);

  const renderChuot = () => {
    switch (view) {
      case VIEW.SINGLE:
        return <Chuot />;
      case VIEW.ARRAY:
        return DisplayArray();
      case VIEW.LIST:
        return <DisplayList />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: "rgba(18, 110, 121, 1)" }}>Tôi là Lưu Văn Đông!</h1>
      <h2>donglv</h2>
      <p>Xin chào<br />Bạn khỏe chứ!</p>

      <div className="action-barBtn">
        <button onClick={() => setView(VIEW.SINGLE)}>1 con chuột</button>
        <button onClick={() => setView(VIEW.ARRAY)}>Array chuột</button>
        <button onClick={() => setView(VIEW.LIST)}>List chuột</button>
        <Music />
      </div>

      <br />
      {renderChuot()}
      <br/>
      {view !== VIEW.NONE && (
        <button onClick={() => setView(VIEW.NONE)}>Ẩn</button>
      )}
    </div>
  );
}
export default App;
