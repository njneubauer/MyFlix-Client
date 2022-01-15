import React from "react";
import Button from "react-bootstrap/Button";
import './genre-view.scss';
import propTypes from "prop-types";


export class GenreView extends React.Component {
    render() {
        const { genre, genreParam, onBackClick } = this.props;
        console.log(genreParam)
        const genrefilter = genre.filter(g=>g.name === genreParam);
        const genreInfo = genrefilter.map(function(g){
            return (
               <div className="genre-info"> 
                    <h2 key={g.name}><strong>{g.name}</strong></h2>
                    <p key={g.description}>{g.description}</p>
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

// genreView.propTypes = {
//     movie: propTypes.shape({
//         title: propTypes.string.isRequired,
//         plot: propTypes.string.isRequired,
//         imageCode: propTypes.string.isRequired,
//         genreInfo: propTypes.array.isRequired,
//         genreNames: propTypes.array.isRequired
//     }).isRequired,
//     onBackClick: propTypes.func.isRequired
// };