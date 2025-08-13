import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const server = "http://localhost:7000"

export interface Song {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    audio: string;
    album: string;
}

export interface Album {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}

interface SongContextType {
    songs: Song[];
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
    children: ReactNode
};

export const SongProvider: React.FC<SongProviderProps> = ({children}) => {
    const [ songs, setSongs ] = useState<Song[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ selectedSong, setSelectedSong ] = useState<string | null>(null);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);

    const fetchSongs = useCallback(async() => {
        try {
            const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
            setSongs(data);
            if(data.length>0) setSelectedSong(data[0].id.toString()) 
                setIsPlaying(false);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <SongContext.Provider value = {{songs}}> {children} </SongContext.Provider>
    )
};

export const useSongData = () : SongContextType => {
    const context = useContext(SongContext);
    if(!context) {
        throw new Error("useSongData must be used within a songProvider");
    }
    return context;
};

