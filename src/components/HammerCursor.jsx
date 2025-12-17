import { useEffect, useState, useRef } from "react";

export default function HammerCursor({ active = true, containerSelector = ".game-board" }) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);
  const prevCursor = useRef("");

  useEffect(() => {
    if (!active) return;

    const container = () => document.querySelector(containerSelector);

    // save previous body cursor and add one handler for the session
    prevCursor.current = document.body.style.cursor;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const c = container();
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      setVisible((prev) => {
        if (inside) {
          // hide native cursor when inside
          document.body.style.cursor = "none";
          return true;
        }
        // restore native cursor when leaving
        document.body.style.cursor = prevCursor.current || "";
        return false;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = prevCursor.current || "";
    };
  }, [active, containerSelector]);

  if (!active) return null;

  return visible ? (
    <img
      src="/images/bua.png"
      alt="hammer-cursor"
      className="custom-cursor"
      style={{ left: pos.x, top: pos.y }}
      draggable={false}
    />
  ) : null;
}
