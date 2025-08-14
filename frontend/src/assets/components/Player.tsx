import { useEffect } from "react";
import { useSongData } from "../../context/SongContext";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
  } = useSongData();

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);
  
  return <div>
        {
            song && <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
                <div className="lg:flex items-center gap-4">
                    <img src={song.thumbnail ? song.thumbnail: "./song.jpg"} className="w-12" alt="" />
                </div>
                </div>
        }
  </div>;
};

export default Player;
