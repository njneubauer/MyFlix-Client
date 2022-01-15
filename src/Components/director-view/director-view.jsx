import React from "react";
import Button from "react-bootstrap/Button";
import './director-view.scss';
import propTypes from "prop-types";


export class DirectorView extends React.Component {
    render() {
        const { director, dirParam, onBackClick } = this.props;
        const dirFilter = director.filter(d=>d.name === dirParam);
        console.log(dirFilter);
        const directorInfo = dirFilter.map(function(d){
            return (
               <div className="director-info"> 
                    <h2 key={d.name}><strong>{d.name}</strong></h2>
                    <p key={d.bio}>{d.bio}</p>
                </div>
            )
         });

        return (
            <div className="director-view">
                <div className="director-view-container-1">
                    <div className="dir-item-1">
                        <h1 className="label">Director Information</h1>
                        {directorInfo}
                        <Button id="btn-director-back" className="primary movie-img-btn" onClick={ ()=>{ onBackClick(null); }}>Back</Button>
                    </div>
                </div>
            </div>
        )
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
        name: propTypes.string.isRequired,
        bio: propTypes.string.isRequired,
    }).isRequired,
    dirParam: propTypes.string.isRequired,
    onBackClick: propTypes.func.isRequired
};