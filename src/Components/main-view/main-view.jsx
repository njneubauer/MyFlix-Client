import React from 'react';
import { Render } from 'react-router-dom'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
    
    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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
        const { movies, user, newUser } = this.state;

        const login = ()=>{
            if (newUser === true) return <RegistrationView  onSignUp={newUser=>{this.onNewUser(newUser)}}/>
                                
            if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
                                            
            if (movies.length === 0) return <div className="main-view" />;
            
            return movies.map(m=>(
                <Col s={12} md={6} lg={4} xl={3} xxl={2} key={m._id}>
                    <MovieCard movieData={m} />
                </Col>
            ))
        }

        const registration = ()=>{
            return <Col>
                    <RegistrationView />
                </Col>
        }

        return (
          
            <Container className='justify-content-center' align="center" fluid>
                <Row className="main-view">
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={login()} />
                            
                            <Route path="/registration" element={registration()}/>

                            <Route path="/movies/:movieId" element={({ match })=>{
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
                                </Col>

                                if (movies.length === 0) return <div className="main-view" />;

                                return <Col md={12}>
                                            <MovieView movie={movies.find(m=> m._id === match.params.movieId)} />
                                        </Col>
                            }} />
                        </Routes>
                    </BrowserRouter>
                </Row>
            </Container>
        );
    }
}