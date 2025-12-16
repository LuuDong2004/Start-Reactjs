
const conChuot = {
    name : "Việt",
    imageUrl : "https://cafebiz.cafebizcdn.vn/2020/1/16/photo-1-15791468238321124382721.jpg",
    imageSize: 90,
};

const arrayChuot = ["Chuột nhắt", "Chuột đồng", "Chuột cống"]; // khai báo mảng
 
function Chuot() {
  return (
    <>
      <h4>{conChuot.name}</h4>
      <img
        className="avatar"
        src={conChuot.imageUrl}
        alt={'Chuột ' + conChuot.name}
        style={{
          width: conChuot.imageSize,
          height: conChuot.imageSize
        }}
      />
    </>
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

function DisplayList() {
  return(
    <div>
      <h3>Đây là gia đình chuột (List) :</h3>
      {
        arrayChuot.map((item, index) => (
          <p key={index}>{item}</p>
        ))
      }
      {addList()}
    </div>
  )
}

function addList(){
  return(
  <div>
    <h4>Gia nhập gia đình chuột</h4>
    <input type="text" placeholder="Nhập tên chuột" />
    <button>Gia nhập</button>
  </div>
  );
}

export default Chuot;
export { DisplayArray };
export { DisplayList };

