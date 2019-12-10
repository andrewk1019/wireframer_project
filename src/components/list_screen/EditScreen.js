import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import Draggable from 'react-draggable'; // The default

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
class EditScreen extends Component {
    state = {
        name: this.props.wireframe.name,
        owner: this.props.auth.email,
        items: [],
        selectedItem: null,
        type: '',
        font_size: 0,
        border_thickness: 0,
        border_radius: 0,
        color1: 'black',
        color2: 'black',
        color3: 'black',
        thickness: 0,
        radius: 0,
        x: 0,
        y: 0

    }

    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.props.wireframe.name = target.value;
        this.setState({
            name: this.props.wireframe.name
        });
        this.props.update(this.props.wireframe, this.state.owner);
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

    close(e){
        e.preventDefault();
        this.props.history.push('/');
    }
    chosenItem(e){
        this.setState({
            selectedItem: e.target
        })
        var item = this.state.selectedItem
        var fontSize  = item.style.fontSize;
        var width = item.style.borderWidth;
        var radius = item.style.borderRadius;
        var x = item.style.left;
        var y = item.style.top;
        console.log(x);
        console.log(y);
        x = x.substring(0, x.length - 2);
        x = parseInt(x);
        y = y.substring(0, y.length - 2);
        y = parseInt(y);
        radius = radius.substring(0, radius.length - 2);
        radius = parseInt(radius);
        width = width.substring(0, width.length - 2);
        width = parseInt(width);
        fontSize = fontSize.substring(0, fontSize.length - 2)
        fontSize = parseInt(fontSize)
        
        if(this.state.selectedItem){
            this.setState({
                type: "Container",
                font_size: fontSize,
                color1: item.style.backgroundColor,
                color2: item.style.borderColor,
                color3: item.style.textColor,
                thickness: width,
                radius: radius,
                x: x,
                y: y,

            })
        }
    }
    createContainer(e){
        e.preventDefault();
        const title = React.createElement('div', {id: 'container1 draggable', onClick: this.chosenItem.bind(this), style:{borderWidth: '1px', fontSize: '12px', borderStyle: 'solid', position: 'relative', top:'0%', borderColor: 'black', backgroundColor: 'white', textColor: 'black', height: '70px', width: '100px', left: '-10px', top: '0px', borderRadius: '5px'}}, '');
        const container = document.getElementById('second_column')
        var item = ReactDOM.render(title, container);
        this.setState({
            selectedItem: item
        })
        return item.draggable();
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
                    <input className="active" type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" disabled = "disabled" id="owner" value={this.state.owner}/>
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
                        <div className="close" onClick={this.close.bind(this)}>
                            Close
                        </div>
                        </span>
                        <div id = "container" onClick={this.createContainer.bind(this)} style={{borderWidth: '1px', borderStyle: 'solid', position: 'relative', top:'-10%', height: '70px', width: '100px', left: '25%', borderRadius: '5px'}}>

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
                    <div className="col s10 m5" id = 'second_column' style={{borderStyle: 'solid', borderWidth: '3px', height:'600px'}}>
                    </div>
                    <div className="col s5 m4" style={{borderStyle: 'solid', borderWidth: '3px', height:'600px'}}>
                        Properties
                        <div>
                            <input type="text" style={{height: '30px', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value= {this.state.type}/>
                        </div>
                        <span>
                            <div className="font_size" style={{display: 'margin-right:10px'}}>
                                Font Size:
                                <input type="number" name="quantity" style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value={this.state.font_size} min="0" step="1"/>
                            </div>
                        </span>
                    <span>
                        <div id="background_color" style={{height: '50px', position: 'relative'}}>
                            Background:
                            <label className = "colorer" style={{backgroundColor: this.state.color1, borderStyle: 'solid', borderColor: 'black', borderWidth: '1px'}}>
                                <input type="color" className="color_scheme" onChange={this.changeColor.bind(this)}/>
                            </label>
                        </div>
                    </span>
                    <span>
                        <div className = "rounded" id="border_color" style={{height: '50px', position: 'relative'}}>
                            Border Color:
                            <label className = "colorer1" style={{backgroundColor: this.state.color2, borderStyle: 'solid', borderColor: 'black', borderWidth: '1px'}}>
                                <input type="color" className="color_scheme1" style={{height: '100%', borderRadius: '100%'}} onChange={this.changeColor1.bind(this)}/>
                            </label>
                        </div>
                    </span>
                    <span>
                        <div className = "rounded" id="text_color" style={{height: '50px', position: 'relative'}}>
                            Text Color:
                            <label className = "colorer2" style={{backgroundColor: this.state.color3, borderStyle: 'solid', borderColor: 'black', borderWidth: '1px'}}>
                                <input type="color" className="color_scheme2" style={{height: '100%', borderRadius: '100%'}} onChange={this.changeColor2.bind(this)}/>
                            </label>
                        </div>
                    </span>
                    <span>
                        <div className="border_thickness_size" style={{display: 'margin-right:10px'}}>
                            Border Thickness:
                            <input type="number" name="quantity" style={{height: '30px', position: 'relative', left: '5%', width:"20%", borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value={this.state.thickness} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="border_radius_size" style={{display: 'margin-right:10px'}}>
                            Border Radius:
                            <input type="number" name="quantity" style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value= {this.state.radius} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="position_X" style={{display: 'margin-right:10px'}}>
                            PositionX:
                            <input type="number" name="quantity" style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value ={this.state.x} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="position_Y" style={{display: 'margin-right:10px'}}>
                            PositionY:
                            <input type="number" name="quantity" style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value ={this.state.y} min="0" step="1"/>
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
    update: (wireframe, name) => dispatch(updateRegister(wireframe, name)),
    top: (wireframe) => dispatch(moveToTopRegister(wireframe)),
    sort_task: (wireframe, bool) => dispatch(sortTaskRegister(wireframe, bool)),
    sort_due_date: (wireframe, bool) =>dispatch(sortDueDateRegister(wireframe, bool)),
    sort_completed: (wireframe, bool) =>dispatch(sortCompletedRegister(wireframe, bool)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EditScreen);