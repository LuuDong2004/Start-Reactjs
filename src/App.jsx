import { useState } from 'react'
import './App.css'
import Chuot , {DisplayArray , DisplayList}  from './chuot.jsx';

function App() {

   const [showChuot, setShowChuot] = useState(false);
   const [showArray, setShowArray] = useState(false);
   const [showList, setShowList] = useState(false);
   
   let displayButton;
   let hiddenButton;
   let displayMore;
   let displayList;
   let chuot;

    // hiện nút xem chuột
    if(showChuot === false && showArray === false && showList === false){
       displayButton = <MyButton onClick={() =>{ setShowChuot(true) ; setShowArray(false) ; setShowList(false)}} /> 

       displayMore = <ShowArrayChuot onClick={() =>{ setShowArray(true) ; setShowChuot(false); setShowList(false) }} />

       displayList = <ShowListChuot onClick={() =>{ setShowList(true) ; setShowChuot(false) ; setShowArray(false)}} />
       chuot = null;
    }
      // hiện chuột và hiện nút ẩn chuột
    if(showChuot === true){
        chuot = <Chuot />;
        hiddenButton = <HiddenButton onClick={() => setShowChuot(false)} />
    }
    // hiện nhiều chuột và hiện nút ẩn chuột
    if(showArray === true){
        // chuot = <DisplayArray />;
        chuot = DisplayArray();
        hiddenButton = <HiddenButton onClick={() => setShowArray(false)} />
    }

    if(showList === true){
        chuot = DisplayList();
        hiddenButton = <HiddenButton onClick={() => setShowList(false)} />
    }
           
  return (
    <div className="App">
      <h1>Tôi là Lưu Văn Đông!</h1>
      <h2>donglv</h2> 
      <p>Xin chào<br/>Bạn khỏe chứ!</p>
      {displayButton}
      {displayMore}
      {displayList}
      {chuot}
      <br/>
      {hiddenButton}
    </div>
  );
}

function MyButton({ onClick }) {
    return <button onClick={onClick}>Xem 1 con chuột!</button>;
}
function ShowArrayChuot({ onClick }) {
    return <button onClick={onClick}>Array chuột!</button>;
}
function ShowListChuot({ onClick }) {
    return <button onClick={onClick}>List chuột!</button>;
}
function HiddenButton({ onClick }) {
    return <button onClick={onClick}>Ẩn con chuột!</button>;
}
export default App;

