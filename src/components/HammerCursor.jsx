import { useEffect, useState, useRef } from "react";

export default function HammerCursor({ active = true, containerSelector = ".game-board", containerRef = null }) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);
  const prevCursor = useRef("");

  useEffect(() => {
    if (!active) return;

    const getContainer = () => (containerRef && containerRef.current) || document.querySelector(containerSelector);

    prevCursor.current = document.body.style.cursor;

    const updatePosAndVisibility = (clientX, clientY) => {
      setPos({ x: clientX, y: clientY });
      const c = getContainer();
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      if (inside) {
        document.body.style.cursor = "none";
        setVisible(true);
      } else {
        document.body.style.cursor = prevCursor.current || "";
        setVisible(false);
      }
    };

    const onPointerMove = (e) => updatePosAndVisibility(e.clientX, e.clientY);
    const onPointerDown = (e) => updatePosAndVisibility(e.clientX, e.clientY);
    const onPointerUp = (e) => {
      // when pointer up, keep visibility state handled by move
    };

    // pointer events cover mouse + touch
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // cleanup
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.cursor = prevCursor.current || "";
    };
  }, [active, containerSelector, containerRef]);

  if (!active) return null;

  return visible ? (
    <img
      src="/images/bua.png"
      alt="hammer-cursor"
      className="custom-cursor"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      draggable={false}
    />
  ) : null;
}
