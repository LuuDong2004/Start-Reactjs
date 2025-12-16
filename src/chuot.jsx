
const conChuot = {
    name : "Việt",
    imageUrl : "https://cafebiz.cafebizcdn.vn/2020/1/16/photo-1-15791468238321124382721.jpg",
    imageSize: 90,
}
function Chuot() {
  return (
    <>
      <h1>{conChuot.name}</h1>
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
export default Chuot;
