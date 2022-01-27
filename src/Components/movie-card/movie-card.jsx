import React from "react";
import propTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import './movie-card.scss';

export class MovieCard extends React.Component {
    render(){
        const { movie } = this.props;
        return (
            <Card style={{ width: '14rem' }}>
                <Link to={`/movies/${movie._id}`}>
                    <Card.Img className="img-responsive" variant="top" src={'data:image/png;base64, '+ movie.imageCode} />
                </Link>
            </Card> 
        );
    }
}

MovieCard.propTypes = {
    movieData: propTypes.shape({
        imageCode: propTypes.string.isRequired,
    }).isRequired,
};