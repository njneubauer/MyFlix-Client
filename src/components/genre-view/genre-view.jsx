import React from "react";
import Button from "react-bootstrap/Button";
import './genre-view.scss';
import propTypes from "prop-types";


export class GenreView extends React.Component {
    render() {
        const { genre, genreParam, onBackClick } = this.props;
        const genrefilter = genre.filter(g=>g.name === genreParam);
        const genreInfo = genrefilter.map(function(g){
            return (
               <div className="genre-info"> 
                    <h2 key={g.name+'1'}><strong>{g.name}</strong></h2>
                    <p key={g.description+'1'}>{g.description}</p>
                </div>
            )
         });

        return (
            <div className="genre-view">
                <div className="genre-view-container-1">
                    <div className="genre-item-1">
                        <h1 className="label">Genre Information</h1>
                        {genreInfo}
                        <Button id="btn-genre-back" className="primary movie-img-btn" onClick={ ()=>{ onBackClick(null); }}>Back</Button>
                    </div>
                </div>
            </div>
        )
    }
}

GenreView.propTypes = {
    genre: propTypes.shape({
        name: propTypes.string.isRequired,
        description: propTypes.string.isRequired,
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};