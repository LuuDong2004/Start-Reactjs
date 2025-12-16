import { useState } from 'react'
import './App.css'
import Chuot from './chuot.jsx';

function App() {

   const [showChuot, setShowChuot] = useState(false);
   let displayButton;
   let hiddenButton;
   let chuot;
    if(showChuot === false){
       displayButton = <MyButton onClick={() => setShowChuot(true)} /> 
       chuot = null;
    }
    if(showChuot === true){
        chuot = <Chuot />;
        hiddenButton = <HiddenButton onClick={() => setShowChuot(false)} />
    }
  return (
    <div className="App">
      <h1>Tôi là Lưu Văn Đông!</h1>
      <h2>donglv</h2> 
      <p>Xin chào<br/>Bạn khỏe chứ!</p>
      {displayButton}
      {chuot}
      <br/>
      {hiddenButton}
    </div>
  );
}

function MyButton({ onClick }) {
    return <button onClick={onClick}>Xem con chuột!</button>;
}
function HiddenButton({ onClick }) {
    return <button onClick={onClick}>Ẩn con chuột!</button>;
}
export default App;

