import React from "react";
import propTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render(){
        const { movieData, onMovieClick } = this.props;
        const styling = {
            overflow: 'hidden', 
            textOverflow: 'ellipsis'
        };

        return (
            <div className="movie-card-bg">
                <div className="movie-card" onClick={()=>{ onMovieClick(movieData); }}>
                    <Card style={{ width: '14rem' }}>
                        <Card.Img className="img-responsive" variant="top" src={movieData.imageUrl} />
                    </Card>
                </div>
            </div>
        );
    }
}

MovieCard.propTypes = {
    movieData: propTypes.shape({
        imageUrl: propTypes.string.isRequired,
    }).isRequired,
    onMovieClick: propTypes.func.isRequired
};

