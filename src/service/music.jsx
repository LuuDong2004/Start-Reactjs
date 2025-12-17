import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

function Music() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };
    return (
        <div>
            <audio ref={audioRef} src="/music/BoChuot.mp3" />
            <button onClick={togglePlay}>
                {isPlaying ? (
                    <>
                        <FaPause /> Tạm dừng
                    </>
                ) : (
                    <>
                        <FaPlay /> Phát nhạc
                    </>
                )}
            </button>

        </div>
    );
}

export default Music;
