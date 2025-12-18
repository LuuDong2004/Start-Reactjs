import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import About from "./pages/about";
import LoginPage from "./pages/loginPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
