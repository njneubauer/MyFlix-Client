import React from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { Container, Row, Col, } from 'react-bootstrap';
import '../movie-card/movie-card.scss';
import './main-view.scss';
import axios from 'axios';
import propTypes from "prop-types";


export class MainView extends React.Component {
    
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            newUser: false
        }
    }

    componentDidUpdate(){
        axios.get('https://nickflixapi.herokuapp.com/movies')
            .then(response=> {
                this.setState({
                    movies: response.data
                });
        }).catch(error=>{
            console.log(error);
        });
    }
    
    setSelectedMovie(newSelectedMovie) {
        this.setState({selectedMovie: newSelectedMovie});
    }

    onLoggedIn(user) {
        this.setState({user});
    }

    onNewUser(newUser){
        this.setState({newUser: newUser});
    }

    render(){
        
        const { movies, selectedMovie, user, newUser } = this.state;

        if(newUser === true) return <RegistrationView  onSignUp={newUser=>{this.onNewUser(newUser)}}/>
        
        if(!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} onSignUp={newUser=>{this.onNewUser(newUser)}} />
        
        if (movies.length === 0) return <div className="main-view" />;

        return (
        <div className="main-view-container bg">
            <nav>
                <header>
                    <h1>Nickflix</h1>
                </header>
            </nav>
            <div className='bg'>
                <Container className='justify-content-center' align="center" fluid>
                    <Row className="main-view">
                        {selectedMovie
                            ? (
                                <Col md={12}>
                                    <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie)=>{this.setSelectedMovie(newSelectedMovie);}} />
                                </Col>
                            )
                            : movies.map(movie => (
                                <Col s={12} md={6} lg={4} xl={3} xxl={2}>
                                    <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie)=>{this.setSelectedMovie(newSelectedMovie);}} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div>
        );
    }
}