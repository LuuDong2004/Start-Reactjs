import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Mouse from "../components/chuot";
import HammerCursor from "../components/HammerCursor";

const GAME_TIME = 30;
const BOARD = { width: 600, height: 400 };
const MOUSE_SIZE = 60;
const TOP_OFFSET = 40;
const hitSound = new Audio("/sounds/pop.mp3");



function Game() {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(GAME_TIME);
    const [level, setLevel] = useState(1);
    const [combo, setCombo] = useState(0);
    const [lastHit, setLastHit] = useState(0);
    const [isOver, setIsOver] = useState(false);

    const [pos, setPos] = useState({ x: 100, y: 100 });

    const randomPosition = useCallback(() => {
        const maxX = BOARD.width - MOUSE_SIZE;
        const maxY = BOARD.height - MOUSE_SIZE - TOP_OFFSET;
        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY + TOP_OFFSET
        };
    }, []);

    
    
    useEffect(() => {
        if (time === 0) {
            setIsOver(true);
            return;
        }
        const timer = setTimeout(() => setTime(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [time]);

    // initial position on mount
    useEffect(() => {
        setPos(randomPosition());
    }, [randomPosition]);

    const hitMouse = () => {
        const now = Date.now();
        const isCombo = now - lastHit < 800;

        const newCombo = isCombo ? combo + 1 : 1;
        setLastHit(now);
        setCombo(newCombo);

        hitSound.currentTime = 0;
        hitSound.play();

        setScore(prev => {
            const point = newCombo >= 3 ? 2 : 1;
            const newScore = prev + point;
            if (newScore % 5 === 0) {
                setLevel(l => l + 1);
            }
            return newScore;
        });

        setPos(randomPosition());
    };

    const restart = () => {
        setScore(0);
        setTime(GAME_TIME);
        setLevel(1);
        setCombo(0);
        setLastHit(0);
        setIsOver(false);
        setPos(randomPosition());
    };

    const speed = Math.max(0.1, 0.3 - level * 0.03);    
   


    return (
        <div className="game-page">
            <div className="game-board">
                {/* JS-based hammer cursor */}
                {!isOver && <HammerCursor active={!isOver} />}
                <div className="game-header">
                    <span>⏱ {time}s</span>
                    <span>⭐ {score}</span>
                    <span>Lv {level}</span>
                    {combo >= 3 && <span className="combo">🔥 COMBO x2</span>}
                    <button
                        className="exit-btn"
                        onClick={() => navigate("/")}
                    >
                        ⬅ Thoát
                    </button>
                </div>

                {!isOver && (
                    <Mouse position={pos} onHit={hitMouse} speed={speed} />
                )}

                {isOver && (
                    <div className="game-over">
                        <h2>🎉 Game Over</h2>
                        <p>Điểm: <b>{score}</b></p>

                        <button onClick={restart}>🔄 Chơi lại</button>
                        <button onClick={() => navigate("/")}>⬅ Về Home</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Game;
