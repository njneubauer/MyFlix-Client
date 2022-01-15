import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import './movie-view.scss';
import propTypes from "prop-types";


export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        const genres = movie.genreNames.map((genre)=><Link to={`/genres/${genre.name}`}><li key={genre.name}>{genre.name}</li></Link>);
        const directorInfo = movie.directorInfo.map(function(d){
           return (
               <div className="director-info"> 
                    <Link to={`/directors/${d.name}`}><li key={d.name}>{d.name}</li></Link>
                </div>
            )
         });

        return (
            <div className="movie-view">
                <div className="movie-view-container-1">
                    <div className="movie-item-1">
                        <img src={'data:image/png;base64, '+ movie.imageCode} alt="" />
                        <Button className="primary movie-img-btn" onClick={ ()=>{ onBackClick(null); }}>Back</Button>
                    </div>
                    <div className="movie-item-2">
                        <div className="title">
                            <h1 className="label">Title </h1>
                            <p className="value">{movie.title}</p>
                        </div>
                        <div className="year">
                            <h1 className="label">Release Year </h1>
                            <p className="value">{movie.year}</p>
                        </div>
                        <div className="genre">
                            <h1 className="label">Genre </h1>
                            <ul>{genres}</ul>
                        </div>
                        <div className="director">
                            <h1 className="label">Director </h1>
                            <ul>{directorInfo}</ul>
                        </div>
                        <div className="plot">
                            <h1 className="label">Plot </h1>
                            <p className="value">{movie.plot}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MovieView.propTypes = {
    movie: propTypes.shape({
        title: propTypes.string.isRequired,
        plot: propTypes.string.isRequired,
        imageCode: propTypes.string.isRequired,
        directorInfo: propTypes.array.isRequired,
        genreNames: propTypes.array.isRequired
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};