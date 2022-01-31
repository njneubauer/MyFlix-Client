import React from "react";
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props){
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== ''){
        filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <Col md={12} style={{ margin: '0.5em 0', width: '100%', padding: '0 2.5em' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map(m => (
            <Col s={12} md={6} lg={4} xl={3} xxl={2} key={m._id}>
                <MovieCard movie={m} />
            </Col>
        ))}
    </>
}

export default connect(mapStateToProps)(MoviesList); 