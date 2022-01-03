import React from "react";
import propTypes from "prop-types";


export class MovieView extends React.Component {
    
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.imageUrl} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.plot}</span>
                </div>
                <button onClick={ ()=>{ onBackClick(null); }}>Back</button>
            </div>
        )
    }
}