function Mouse({ position, onHit, size = 60 }) {
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size}px`,
    height: `${size}px`
  };

  return (
    <img
      src="/images/chuot.jpg"
      alt="mouse"
      onPointerDown={onHit}
      className="mouse"
      style={style}
      draggable={false}
    />
  );
}

export default Mouse;
