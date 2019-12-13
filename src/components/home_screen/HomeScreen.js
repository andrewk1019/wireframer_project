import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import { createRegister } from '../../store/database/asynchHandler'

class HomeScreen extends Component {
    handleNewList = () =>{
        this.props.create(this.props.history);
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s14 m4">
                        <div className = "recentWorks">
                            <b>Recent Work</b>
                        <TodoListLinks />
                        </div>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer<sup>TM</sup>
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        wireframes: state.firestore.data,
    };
};

const mapDispatchToProps = dispatch => ({
    create: (props) => dispatch(createRegister(props))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(HomeScreen);