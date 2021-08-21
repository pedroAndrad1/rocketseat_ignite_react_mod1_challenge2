import { useMoviesContext } from "../contexts/MoviesContext";

export default function Header() {
    const {
        selectedGenre,
      } = useMoviesContext();

    return (
        <header>
            <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
    )
}