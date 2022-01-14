import React from "react";
import Button from "react-bootstrap/Button";
import './genre-view.scss';
import propTypes from "prop-types";


export class GenreView extends React.Component {
    render() {
        const { genre, dirParam, onBackClick } = this.props;
        const dfilter = genre.filter(d=>d.name === dirParam);
        const genreInfo = dfilter.map(function(d){
            return (
               <div className="genre-info"> 
                    <h2 key={d.name}>{d.name}</h2>
                    <p key={d.bio}>{d.bio}</p>
                </div>
            )
         });

        return (
            <div className="genre-view">
                <div className="genre-view-container-1">
                    <div className="dir-item-1">
                        <h1 className="label">genre Information</h1>
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