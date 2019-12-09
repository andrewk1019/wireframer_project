import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateRegister } from '../../store/database/asynchHandler';
import {moveToTopRegister } from '../../store/database/asynchHandler';
import {sortTaskRegister } from '../../store/database/asynchHandler';
import {sortDueDateRegister } from '../../store/database/asynchHandler';
import {sortCompletedRegister } from '../../store/database/asynchHandler';
import { Modal, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
class EditScreen extends Component {
    state = {
        name: '',
        owner: '',
        color1: 'black',
        color2: 'black',
        color3: 'black',
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        target.name === "name" ? this.props.wireframe.name = target.value : this.props.wireframe.owner = target.value;
        this.props.update(this.props.wireframe);
    }

    sortTask = () =>{
        this.props.sort_task(this.props.wireframe, this.state.task);
        var val = this.state.task
        this.setState({
            task: !val
        })
    }

    sortDueDate = () =>{
        this.props.sort_due_date(this.props.wireframe, this.state.due_date);
        var val = this.state.due_date
        this.setState({
            due_date: !val
        })
    }

    sortCompleted = () =>{
        this.props.sort_completed(this.props.wireframe, this.state.completed);
        var val = this.state.completed
        this.setState({
            completed: !val
        })
    }

    deleteList = () =>{
        this.props.delete_list(this.props.wireframe, this.props.history)
    }

    addItem = () =>{
        
    }

    changeColor(e){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            color1: target.value
        })
    }
    changeColor1(e){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            color1: target.value
        })
    }

    changeColor2(e){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            color3: target.value
        })
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(wireframe && wireframe.pos != 0 && this.state.value){
            this.state.value = false;
            this.props.top(wireframe);
        }
       
        return (
            <div className="container white body" style={{borderStyle: 'solid', height:'758px', borderRadius: '10px', borderWidth: '3px'}}>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name"/>
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner"/>
                </div>
                <div className="row">
                    <div className="col s12 m3" style={{borderStyle: 'solid', borderWidth: '3px', height:'600px'}} >
                        <span>
                        <div className="zoom_in">

                        </div>
                        <div className="zoom_out">

                        </div>
                        <div className="save">
                            Save
                        </div> 
                        <div className="close">
                            Close
                        </div>
                        </span>
                        <div id = "container" style={{borderWidth: '1px', borderStyle: 'solid', position: 'relative', top:'-10%', height: '70px', width: '100px', left: '25%', borderRadius: '5px'}}>

                        </div>
                        <div id = "container_name"style={{ position: 'relative', top:'-10%', left: '26%'}}>
                            <b>Container</b>
                        </div>
                        <div id = "label" style={{position: 'relative', height: '50px', width: '200px', left: '10%', top: '-5%'}}>
                            Prompt for input:
                        </div>
                        <div id = "label_name"style={{ position: 'relative', top:'-10%', left: '40%'}}>
                            <b>Label</b>
                        </div>
                        <div id = "submit" style={{borderWidth: '1px', borderStyle: 'solid', textAlign: 'center', paddingTop: '2.5%', position: 'relative', top:'-5%', height: '35px', backgroundColor: 'grey', width: '120px', left: '20%', borderRadius: '5px'}}>
                            Submit
                        </div>
                        <div id = "label_name"style={{ position: 'relative', top: '-5%', left: '35%'}}>
                            <b>Button</b>
                        </div>
                        <div id = "textfield" style={{borderWidth: '1px', borderStyle: 'solid', borderColor: 'black', color: 'lightgrey', position: 'relative', height: '25px', width: '180px', left: '5%', borderRadius: '5px'}}>
                            Input
                        </div>
                        <div id = "textfield_name"style={{ position: 'relative', left: '30%'}}>
                            <b>Textfield</b>
                        </div>
                    </div>
                    <div className="col s10 m5" style={{borderStyle: 'solid', borderWidth: '3px', height:'600px'}}>
                    </div>
                    <div className="col s5 m4" style={{borderStyle: 'solid', borderWidth: '3px', height:'600px'}}>
                        Properties
                        <div>
                            <input type="text" style={{height: '30px', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}}/>
                        </div>
                        <span>
                            <div className="font_size" style={{display: 'margin-right:10px'}}>
                                Font Size:
                                <input type="number" name="quantity" style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
                            </div>
                        </span>
                    <span>
                        <div id="background_color" style={{height: '50px'}}>
                            Background:
                            <label className = "colorer" style={{backgroundColor: this.state.color1}}>
                                <input type="color" className="color_scheme" onChange={this.changeColor.bind(this)}/>
                            </label>
                        </div>
                    </span>
                    <span>
                        <div className = "rounded" id="border_color" style={{height: '50px'}}>
                            Border Color:
                            <label className = "colorer1" style={{backgroundColor: this.state.color2}}>
                                <input type="color" className="color_scheme1" style={{height: '100%', borderRadius: '100%'}} onChange={this.changeColor1.bind(this)}/>
                            </label>
                        </div>
                    </span>
                    <span>
                        <div className = "rounded" id="text_color" style={{height: '50px'}}>
                            Text Color:
                            <label className = "colorer2" style={{backgroundColor: this.state.color3}}>
                                <input type="color" className="color_scheme2" style={{height: '100%', borderRadius: '100%'}} onChange={this.changeColor2.bind(this)}/>
                            </label>
                        </div>
                    </span>
                    <span>
                        <div className="border_thickness_size" style={{display: 'margin-right:10px'}}>
                            Border Thickness:
                            <input type="number" name="quantity" style={{height: '30px', position: 'relative', left: '5%', width:"20%", borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="border_radius_size" style={{display: 'margin-right:10px'}}>
                            Border Radius:
                            <input type="number" name="quantity" style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
                        </div>
                    </span>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
  if(wireframe)
    wireframe.id = id;
  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    update: (wireframe) => dispatch(updateRegister(wireframe)),
    top: (wireframe) => dispatch(moveToTopRegister(wireframe)),
    sort_task: (wireframe, bool) => dispatch(sortTaskRegister(wireframe, bool)),
    sort_due_date: (wireframe, bool) =>dispatch(sortDueDateRegister(wireframe, bool)),
    sort_completed: (wireframe, bool) =>dispatch(sortCompletedRegister(wireframe, bool)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EditScreen);