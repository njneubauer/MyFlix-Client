import React from "react";
import Button from "react-bootstrap/Button";
import './movie-view.scss';
import propTypes from "prop-types";


export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        const genres = movie.genreNames.map((genre)=><li key={genre.name}>{genre.name}&nbsp;</li>);
        const directorInfo = movie.directorInfo.map(function(d){
           return (
               <div className="director-info"> 
                    <h2 key={d.name}>{d.name}</h2>
                    <p key={d.bio}>{d.bio}</p>
                </div>
            )
         });

        return (
            <div>
                <div className="movie-view-container">
                    <div className="item-1">
                        <img src={movie.imageUrl} alt="" />
                        <Button className="primary movie-img-btn" onClick={ ()=>{ onBackClick(null); }}>Back</Button>
                    </div>
                    <div className="item-2">
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
                        <div className="plot">
                            <h1 className="label">Plot </h1>
                            <p className="value">{movie.plot}</p>
                        </div>
                    </div>
                </div>
                    <div className="movie-view-container-2">
                        <div className="item-3">
                            <h1 className="label">Director Information</h1>
                            {directorInfo}
                        </div>
                    </div>
                <Button id="bottom-btn" style={{ width: "300px" }} className="primary bottom" onClick={ ()=>{ onBackClick(null); }}>Back</Button>
            </div>

        )
    }
}

MovieView.propTypes = {
    movie: propTypes.shape({
        title: propTypes.string.isRequired,
        plot: propTypes.string.isRequired,
        imageUrl: propTypes.string.isRequired,
        directorInfo: propTypes.array.isRequired,
        genreNames: propTypes.array.isRequired
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};