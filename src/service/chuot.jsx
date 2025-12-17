
const conChuot = {
    name : "Việt",
    imageUrl : "https://cafebiz.cafebizcdn.vn/2020/1/16/photo-1-15791468238321124382721.jpg",
    imageSize: 90,
};

const arrayChuot = ["Chuột nhắt", "Chuột đồng", "Chuột cống"]; // khai báo mảng
 
function Chuot() {
  return (
    <div className="chuot-single">
      <h4 style={{ color: "rgba(225, 146, 72, 1)" }}>{conChuot.name}</h4>
      <img
        className="avatar"
        src={conChuot.imageUrl}
        alt={'Chuột ' + conChuot.name}
        style={{
          width: conChuot.imageSize,
          height: conChuot.imageSize
        }}
      />
    </div>
  );
}


function DisplayArray() {
    return(
       <div>
        <h3>Đây là gia đình chuột (Array) :</h3>
         {arrayChuot.map(item => (
         <p>{item}</p>
      ))}
    </div>
    );
}
export default Chuot;
export { DisplayArray };

