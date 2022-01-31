import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
// Components
import { MovieView } from '../movie-view/movie-view.jsx';
import { DirectorView } from '../director-view/director-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { GenreView } from '../genre-view/genre-view'
import { NavBar } from '../common/navbar.jsx';
// Boostrap and scss
import { Row, Col } from 'react-bootstrap';
import './main-view.scss';

class MainView extends React.Component {
    
    constructor(){
        super();  
        this.state = {
            user: null,
        }
    }

    getMovies(token){
        axios.get('https://nickflixapi.herokuapp.com/movies', {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then(response=> {
               this.props.setMovies(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }

    getUser(token){
        const username = localStorage.getItem('user');
        axios.get(`https://nickflixapi.herokuapp.com/user/${username}`, {
            headers:{ Authorization: `bearer ${token}` }
        }).then(response=>{
            this.props.setUser(response.data);
        }).catch(e=>{
            console.log('error aquiring user info');
        });
    }
    
    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }

    onLoggedIn(authData) {
        this.setState({ user: authData.user.username });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
        this.getUser(authData.token);
    }

    setUserState(userData){
        this.props.setUser(userData);
    }

    onLogout(){
        localStorage.clear();
        this.props.setUser('');
        this.setState({
            user: null
        });
        window.location.href = '/';
    }
    
    render(){
        const { user } = this.state;
        const { movies, userInfo } = this.props;
        const bgClass = (user) ? 'background-color' : 'background-img';

        return (
                <Router>
                    <NavBar onLogout={ ()=> this.onLogout() } user={user} />
                    <div id={`${bgClass}`}>
                    <Row id="row">
                            <Route exact path="/" render={()=>{                                                        
                                    if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
                                                       
                                    if (movies.length === 0) return <div className="main-view">Loading</div>;
                                    
                                    return <MoviesList movies={movies} />
                                }
                            } />
                            
                            <Route path="/registration" render={()=>{
                                if (user) return <Redirect to="/" />    
                                return <RegistrationView />
                            }} />
                            
                            <Route path="/profile" render={()=>{
                                if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} /> 
                                return <ProfileView userInfo={userInfo} setUserState={user=> this.setUserState(user)} onLogout={()=> this.onLogout()} />
                            }} />

                            <Route path="/movies/:movieId" render={({ match, history })=>{ 
                                if (!user) return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
                                    
                                if (movies.length === 0) return <div className="main-view">Loading</div>;

                                return <Col md={12}><MovieView userInfo={userInfo} setUserState={userData=> this.setUserState(userData)} movie={movies.find(m=> m._id === match.params.movieId)} onBackClick={() => history.goBack()} /></Col>
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

let mapStateToProps = state => {
    return { 
        movies: state.movies,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, {setMovies, setUser})(MainView);