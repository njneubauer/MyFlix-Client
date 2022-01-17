import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// bootstrap & scss
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { DirectorView } from '../director-view/director-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { GenreView } from '../genre-view/genre-view'
import { NavBar } from '../common/navbar.jsx';
import { Row, Col } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {
    
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            userInfo: null,
            newUser: false
        }
    }

    getMovies(token){
        axios.get('https://nickflixapi.herokuapp.com/movies', {
            headers: {
                Authorization: `bearer ${token}`,
            }
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

    updateUserState(username){
        this.setState({
            user: username
        });
    }

    onLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render(){
        const { movies, user, userInfo } = this.state;
        const bgClass = (user) ? 'background-color' : 'background-img'
        return (
                <Router>
                    <NavBar onLogout={()=> this.onLogout()} user={user} />
                    <div id={`${bgClass}`}>
                    <Row id="row">
                            <Route exact path="/" render={()=>{                                                        
                                    if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
                                                       
                                    if (movies.length === 0) return <div className="main-view">Loading</div>;
                                    
                                    return movies.map(m=>(
                                        <Col s={12} md={6} lg={4} xl={3} xxl={2} key={m._id}><MovieCard movieData={m} /></Col>
                                    ))
                                }
                            } />
                            
                            <Route path="/registration" render={()=>{
                                if (user) return <Redirect to="/" />    
                                return <RegistrationView />
                            }} />
                            
                            <Route path="/profile" render={()=>{
                                if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} /> 
                                return <ProfileView user={user} updateUserState={user=> this.updateUserState(user)} />
                            }} />

                            <Route path="/movies/:movieId" render={({ match, history })=>{ 
                                if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
                                    
                                if (movies.length === 0) return <div className="main-view">Loading</div>;

                                return <Col md={12}><MovieView movie={movies.find(m=> m._id === match.params.movieId)} onBackClick={() => history.goBack()} /></Col>
                            }} />

                            <Route path="/directors/:name" render={({ match, history }) => {
                                if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />

                                if (movies.length === 0) return <div className="main-view" />;
                               
                                return <Col md={12}>
                                    <DirectorView dirParam={match.params.name} director={movies.find(m => m.directorInfo.some(d=>d.name === match.params.name)).directorInfo} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                            <Route path="/genres/:genre" render={({ match, history })=>{
                                if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />

                                if (movies.length === 0) return <div className="main-view" />;

                                return <Col md={12}>
                                    <GenreView genreParam={match.params.genre} genre={movies.find(m =>m.genreNames.some(g=>g.name === match.params.genre)).genreNames} onBackClick={() => history.goBack()} />
                                </Col>

                            }} />
                    </Row>
                    </div>
                </Router>
        );
    }
}