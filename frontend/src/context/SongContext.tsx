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
    song: Song | null;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    loading: boolean;
    selectedSong: string | null;
    setSelectedSong: (id: string) => void;
    albums: Album[];
    fetchSingleSong: () => Promise<void>;
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
    const [ albums, setAlbums ] = useState<Album[]>([]);

    const fetchSongs = useCallback(async() => {
        setLoading(true);
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
    }, []);

    const [song, setSong] = useState<Song | null>(null);

    const fetchSingleSong = useCallback(async()=> {
        if(!selectedSong)
            return;
        try {
            const {data} = await axios.get<Song>(`${server}/api/v1/song/${selectedSong}`);
            setSong(data);
        } catch (error) {
            console.log(error);
        }
    }, [selectedSong]);

    const fetchAlbums = useCallback(async()=> {
        try {
            const {data} = await axios.get<Album[]>(`${server}/api/v1/album/all`)
            setAlbums(data);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
    }, []);

    return (
        <SongContext.Provider 
            value = {{
                songs, 
                selectedSong, 
                setSelectedSong, 
                isPlaying, 
                setIsPlaying, 
                loading,
                albums,
                fetchSingleSong,
                song
            }}
            >
             {children} </SongContext.Provider>
    )
};

export const useSongData = () : SongContextType => {
    const context = useContext(SongContext);
    if(!context) {
        throw new Error("useSongData must be used within a songProvider");
    }
    return context;
};

