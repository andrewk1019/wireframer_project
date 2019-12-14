import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { firestoreConnect } from 'react-redux-firebase';

class WireframeLinks extends React.Component {
    state={
        value: true
    }
    render() {
        const wireframes = this.props.wireframes;
        if(wireframes && this.state.value){
            this.state.value = false;
            wireframes.sort(function(a, b){
                if(a.pos < b.pos) { return -1; }
                else if(a.pos > b.pos) { return 1; }
                return 0;
          })
        }
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.id} key={wireframe.id}>
                        <WireframeCard wireframe={wireframe} />
                    </Link>  
                )
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps),
)(WireframeLinks);