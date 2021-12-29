import React from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx'

export class MainView extends React.Component {
    
    constructor(){
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Inception', Description: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.', ImagePath: 'https://img.reelgood.com/content/movie/2208ea58-f84f-48ed-b387-13dd836dc446/poster-780.jpg'},
                {_id: 2, Title: 'The Shawshank Redemption', Description: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.', ImagePath: 'https://img.reelgood.com/content/movie/900bc451-e61f-48db-96c7-32b6635a3f75/poster-780.jpg'},
                {_id: 3, Title: 'Gladiator', Description: 'In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos. Maximus is one of the Roman army\'s most capable and trusted generals and a key advisor to the emperor.  As Marcus\' devious son Commodus ascends to the throne, Maximus is set to be executed.  He escapes, but is captured by slave traders.  Renamed Spaniard and forced to become a gladiator, Maximus must battle to the death with other men for the amusement of paying audiences.', ImagePath: 'https://img.reelgood.com/content/movie/64d0c89f-ecd0-4d7f-9ab6-5aad88b3b17a/poster-780.jpg'}
            ],
            selectedMovie: null
        }
    }
    
    setSelectedMovie(newSelectedMovie) {
        this.setState({selectedMovie: newSelectedMovie});
    }

    render(){
        
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie)=>{this.setSelectedMovie(newSelectedMovie);}} />;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie)=>{this.setSelectedMovie(newSelectedMovie);}} />)}
            </div>
        );
    }
}