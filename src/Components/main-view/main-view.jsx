import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// bootstrap & scss
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { Container, Row, Col, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './main-view.scss';



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

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token){
        axios.get('https://nickflixapi.herokuapp.com/movies', {
            headers: {Authorization: `bearer ${token}`}
        }).then(response=> {
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

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    onLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
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
            <header id='main-view'>
                <nav>
                    <h1>Nickflix</h1>
                    <ul className='nav-items'>
                        <li><Button className='primary logout' onClick={()=>{ this.onLogout(); }}>Logout</Button></li>
                    </ul>
                </nav>
            </header>
            <Container className='justify-content-center' align="center" fluid>
                <Row className="main-view">
                    {selectedMovie
                        ? (
                            <Col key={selectedMovie._id} md={12}>
                                <MovieView key={selectedMovie._id} movie={selectedMovie} onBackClick={(newSelectedMovie)=>{this.setSelectedMovie(newSelectedMovie);}} />
                            </Col>
                        )
                        : movies.map(movie => (
                            <Col key={movie._id} s={12} md={6} lg={4} xl={3} xxl={2}>
                                <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie)=>{this.setSelectedMovie(newSelectedMovie);}} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
        );
    }
}