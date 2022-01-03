import React from "react";
import propTypes from "prop-types";

export class MovieCard extends React.Component {
    render(){
        const { movieData, onMovieClick } = this.props;
    
        return (
            <div className="movie-card" onClick={()=>{ onMovieClick(movieData); }}>{movieData.title}</div>
        );
    }
}

MovieCard.propTypes = {
    movieData: propTypes.shape({
        title: propTypes.string.isRequired,
        plot: propTypes.string.isRequired,
        imageUrl: propTypes.string.isRequired
    }).isRequired,
    onMovieClick: propTypes.func.isRequired
};
