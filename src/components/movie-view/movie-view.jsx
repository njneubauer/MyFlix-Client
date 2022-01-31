import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import './movie-view.scss';
import propTypes from "prop-types";
import axios from "axios";


export class MovieView extends React.Component {
    
    addToFavorites(){
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios({
                method: 'post', 
                url: `https://nickflixapi.herokuapp.com/${user}/addmovie/${this.props.movie.title}`,
                headers: { Authorization: `bearer ${token}` }
        }).then(response =>{
            this.props.setUserState(response.data);
            localStorage.setItem('favoriteMovies', response.data.favoriteMovies);
        }).catch(err =>{
            console.error(err);
        });
    }

    deleteFromFavorites(){
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios({
            method: 'delete', 
            url: `https://nickflixapi.herokuapp.com/${user}/favorites/delete/${this.props.movie.title}`, 
            headers: { Authorization: `bearer ${token}` }
        }).then(response =>{
            this.props.setUserState(response.data);
            localStorage.setItem('favoriteMovies', response.data.favoriteMovies);
        }).catch(err=>{
            console.error(err);
        });
    }

    render() {
        const { movie, onBackClick, userInfo } = this.props;
        const genres = movie.genreNames.map((genre)=><li className="genre-btn-margin" key={genre.name}><Button as={Link} to={`/genres/${genre.name}`} className="primary">{genre.name}</Button></li>);
        
        const directorInfo = movie.directorInfo.map(function(d, index){
            return (
               <div key={index.toString()} className="director-info">
                    <li className="director-btn-margin" key={d.name}><Button as={Link}to={`/directors/${d.name}`} className="primary">{d.name}</Button></li>
                </div>
            )
         });

        return (
            <div className="movie-view">
                <div className="movie-view-container-1">
                    <div className="movie-item-1">
                        <img src={'data:image/png;base64, '+ movie.imageCode} alt="" />
                        {  userInfo.favoriteMovies.includes(movie._id)
                            ? <Button className="favorites-img-btn" variant="danger" onClick={ ()=>this.deleteFromFavorites() }>Delete from Favorites</Button>
                            : <Button className="favorites-img-btn" variant="warning" onClick={ ()=>this.addToFavorites() }>Add to Favorites</Button>  
                        }
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
                            <ul className="d-flex">{genres}</ul>
                        </div>
                        <div className="director">
                            <h1 className="label">Director </h1>
                            <ul className="d-flex">{directorInfo}</ul>
                        </div>
                        <div className="plot">
                            <h1 className="label">Plot </h1>
                            <p className="value">{movie.plot}</p>
                        </div>
                        <div className="back-btn-container">
                            <Button className="back-btn" variant="primary" onClick={ ()=>{ onBackClick(null); }}>Back</Button>
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
    userInfo: propTypes.shape({
        favoriteMovies: propTypes.array.isRequired
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};