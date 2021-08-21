import { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { api } from "../services/api";

//Encapsulei aqui a lógica de acesso e disponibilizacao das informacoes para toda a app

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface MoviesContextData {
    selectedGenreId: number;
    setSelectedGenreId: (id: number) => void;
    selectedGenre: GenreResponseProps;
    setSelectedGenre: (selectedGenre: GenreResponseProps) => void;
    genres: GenreResponseProps[];
    setGenres: (genres: GenreResponseProps[]) => void;
    movies: MovieProps[];
    setMovies: (movies: MovieProps[]) => void;
}

interface MoviesContextProps{
    children: ReactNode
}
export const MoviesContext = createContext({} as MoviesContextData);

export function MoviesContextProvider({children} : MoviesContextProps) {

    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<MovieProps[]>([]);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    return (
        <MoviesContext.Provider value={{
            selectedGenreId,
            setSelectedGenreId,
            selectedGenre,
            setSelectedGenre,
            genres,
            setGenres,
            movies,
            setMovies,
        }}>
            {children}
        </MoviesContext.Provider>
    )
}

export const useMoviesContext = () =>{
    return useContext(MoviesContext)
}
