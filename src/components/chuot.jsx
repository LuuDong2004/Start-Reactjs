function Mouse({ position, onHit }) {
  return (
    <img
      src="/images/chuot.jpg"
      alt="mouse"
      onClick={onHit}
      className="mouse"
      style={{
        left: position.x,
        top: position.y
      }}
    />
  );
}

export default Mouse;
