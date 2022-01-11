import React from "react";
import propTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import './movie-card.scss';

export class MovieCard extends React.Component {
    render(){
        const { movieData } = this.props;
        console.log(movieData);
        return (
            <div className="movie-card">
                <Card style={{ width: '14rem' }}>
                    <Link to={`/movies/${movieData._id}`}>
                        <Card.Img className="img-responsive" variant="top" src={movieData.imageUrl} />
                    </Link>
                </Card>
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
