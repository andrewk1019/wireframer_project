import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, reactReduxFirebase } from 'react-redux-firebase';
import { updateRegister } from '../../store/database/asynchHandler';
import {moveToTopRegister } from '../../store/database/asynchHandler';
import {sortTaskRegister } from '../../store/database/asynchHandler';
import {sortDueDateRegister } from '../../store/database/asynchHandler';
import {sortCompletedRegister } from '../../store/database/asynchHandler';
import {getFirestore} from 'redux-firestore';
import {Rnd} from 'react-rnd'

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { isTSEnumMember } from '@babel/types';
class EditScreen extends Component {
    state = {
        name: this.props.wireframe.name,
        owner: this.props.auth.email,
        prev: null,
        items: this.props.wireframe.items ? this.props.wireframe.items : [],
        newItems: [],
        newFields: [],
        selectedItem: null,
        type: '',
        font_size: 0,
        border_radius: 0,
        color1: 'black',
        color2: 'black',
        color3: 'black',
        thickness: 0,
        radius: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        totalCount: this.props.wireframe.items.length,
        originalItem: null,
        render: false

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
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            color1: target.value
        })
        this.state.selectedItem.style.backgroundColor = target.value;
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].backgroundColor = target.value;
    }
    }
    changeColor1(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            color2: target.value
        })
        this.state.selectedItem.style.borderColor = target.value;
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].borderColor = target.value;
    }
    }

    changeColor2(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            color3: target.value
        })
        this.state.selectedItem.style.color = target.value;
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].textColor = target.value;
    }
    }
    save(e){
        e.preventDefault();
        var firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({items:this.state.items});
    }
    close(e){
        e.preventDefault();
        this.props.history.push('/');
    }
    
    createContainer(e){
        e.preventDefault();
        this.setState({
            render: true
        })
        this.state.items[this.state.items.length] = {type: 'Container', 
                                        fontSize: 12,
                                        backgroundColor: 'white', 
                                        textColor: 'black',
                                        borderColor:'black', 
                                        thickness: 1, 
                                        text: '',
                                        radius: 1,
                                        width: 100,
                                        height: 60,
                                        positionX: 0,
                                        positionY: 0,
                                        borderStyle: 'solid',
                                        textAlign: 'center',
                                        id: "container" + this.state.totalCount++
                                     };
        this.setState({
            render: false
        })
    }

    createLabel(e){
        e.preventDefault();
        this.setState({
            render: true
        })
        this.state.items[this.state.items.length] = {type: 'Label', 
                                        fontSize: 14,
                                        backgroundColor: 'white', 
                                        textColor: 'black',
                                        borderColor:'white', 
                                        thickness: 1, 
                                        text: 'Prompt for input:',
                                        radius: 1,
                                        width: 200,
                                        height: 25,
                                        positionX: 0,
                                        positionY: 0,
                                        borderStyle: 'solid',
                                        textAlign: 'center',
                                        id: "label" + this.state.totalCount++
                                     };
        this.setState({
            render: false
        })
    }

    createButton(e){
        e.preventDefault();
        this.setState({
            render: true
        })
        this.state.items[this.state.items.length] = {type: 'Button', 
                                        fontSize: 12,
                                        backgroundColor: 'grey', 
                                        textColor: 'black',
                                        borderColor:'black', 
                                        thickness: 1, 
                                        text: 'Submit',
                                        radius: 5,
                                        width: 125,
                                        height: 35,
                                        positionX: 0,
                                        positionY: 0,
                                        borderStyle: 'solid',
                                        textAlign: 'center',
                                        id: "button" + this.state.totalCount++
                                     };
        this.setState({
            render: false
        })
    }
    handleDrag = (e, pos)=>{
        e.preventDefault();
        if(this.state.selectedItem != null){
            this.state.selectedItem = e.target;
            this.setState({
                x: pos.lastX - (pos.x/2),
                y: pos.lastY - (pos.y/2)})
                var index = null;
                for(var i = 0; i < this.state.items.length; i++){
                    if(this.state.items[i].id == this.state.selectedItem.id){
                        index = i;
                    }
                }
                if(index != null){
                    this.state.items[index].positionX = pos.lastX - (pos.x/2);
                    this.state.items[index].positionY =  pos.lastY - (pos.y/2);
                }
            }
    }
    

    handleResize = (e, direction, ref, delta, position) => {
        e.preventDefault();
        console.log(position)
        if(!this.state.selectedItem){
            this.state.selectedItem = e.target;
        }
            this.setState({
            width: parseInt(ref.style.width.substring(0, ref.style.width.length - 2)),
            height: parseInt(ref.style.height.substring(0, ref.style.height.length - 2)),
            x: position.x/2,
            y: position.y/2
            });
            var index = null;
            for(var i = 0; i < this.state.items.length; i++){
                if(this.state.items[i].id == this.state.selectedItem.id){
                    index = i;
                }
            }
            if(index != null){
                this.state.items[index].width = ref.style.width;
                this.state.items[index].height = ref.style.height;
                this.state.items[index].positionX = this.state.x;
                this.state.items[index].positionY = this.state.y;
            }

      }
    createTextfield(e){
        e.preventDefault();
        this.setState({
            render: true
        })
        this.state.items[this.state.items.length] = {type: 'Container', 
                                        fontSize: 12,
                                        backgroundColor: 'white', 
                                        textColor: 'lightgrey',
                                        borderColor:'black', 
                                        thickness: 1, 
                                        text: 'Input',
                                        radius: 5,
                                        width: 180,
                                        height: 25,
                                        positionX: 0,
                                        positionY: 0,
                                        borderStyle: 'solid',
                                        textAlign: 'left',
                                        id: "textfield" + this.state.totalCount++
                                     };
        this.setState({
            render: false
        })
    }
    changeFontSize(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            font_size: target.value
        })
        this.state.selectedItem.style.fontSize = target.value+'px';
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].fontSize = target.value;
    }
    }
    changeRadius(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            radius: target.value
        })
        this.state.selectedItem.style.borderRadius = target.value+'px';
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].borderRadius = target.value;
    }
    }
    changeX(e){
        e.preventDefault();
        this.setState({
            render: true
        })
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            x: target.value
        })
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].positionX = target.value;
        this.state.x = target.value;
        this.setState({
            render: false
        })
    }
    }
    changeY(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].positionY = target.value;
        this.setState({
            y: target.value
        })
    }
    }
    changeThickness(e){
        e.preventDefault();
        if(this.state.selectedItem){
            const { target } = e;
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
            this.setState({
                thickness: target.value
            })
            this.state.selectedItem.style.borderWidth = target.value+'px';
            var index = null;
            for(var i = 0; i < this.state.items.length; i++){
                if(this.state.items[i].id == this.state.selectedItem.id){
                    index = i;
                }
            }
            this.state.items[index].thickness = target.value;
        }
    }
    changeText(e){
        e.preventDefault();
        if(this.state.selectedItem){
            const { target } = e;
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
            this.setState({
                type: target.value
            })
            this.state.selectedItem.innerHTML = target.value;
            var index = null;
            for(var i = 0; i < this.state.items.length; i++){
                if(this.state.items[i].id == this.state.selectedItem.id){
                    index = i;
                }
            }
            this.state.items[index].text = target.value;
        }
    }
    changeWidth(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].width = target.value;
        this.setState({
            width: target.value
        })
        this.state.selectedItem.style.width = target.value;
    }
    }
    changeHeight(e){
        e.preventDefault();
        if(this.state.selectedItem){
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        this.state.items[index].height = target.value;
        this.setState({
            height: target.value
        })
        this.state.selectedItem.style.height = target.value;
    }
    }
    select(e){
        e.preventDefault();
        this.state.selectedItem = e.target;
        var item = this.state.selectedItem
        var fontSize  = item.style.fontSize;
        var width = item.style.borderWidth;
        var radius = item.style.borderRadius;
        radius = radius.substring(0, radius.length - 2);
        radius = parseInt(radius);
        width = width.substring(0, width.length - 2);
        width = parseInt(width);
        fontSize = fontSize.substring(0, fontSize.length - 2)
        fontSize = parseInt(fontSize)
        var width1 = parseInt(item.style.width.substring(0,  item.style.width.length - 2))
        var height1 = parseInt(item.style.height.substring(0,  item.style.height.length - 2))
        var index = null;
        for(var i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].id == this.state.selectedItem.id){
                index = i;
            }
        }
        if(this.state.selectedItem){
            this.setState({
                type: e.target.innerHTML,
                font_size: fontSize,
                color1: item.style.backgroundColor,
                color2: item.style.borderColor,
                color3: item.style.color,
                thickness: width,
                radius: radius,
                x: this.state.items[index].positionX,
                y: this.state.items[index].positionY,
                width: width1,
                height: height1,
            })
        }
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container0 white body" style={{borderStyle: 'solid', height:'758px', borderRadius: '10px', borderWidth: '3px'}}>
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
                        <div className="save" onClick ={this.save.bind(this)}>
                            Save
                        </div> 
                        <div className="close" onClick={this.close.bind(this)}>
                            Close
                        </div>
                        </span>
                        <div id = "container" onClick={this.createContainer.bind(this)} style={{borderWidth: '1px', borderStyle: 'solid', position: 'relative', top:'-10%', height: '70px', width: '100px', left: '30%', borderRadius: '5px'}}>
                        </div>
                        <div id = "container_name"style={{ position: 'relative', top:'-10%', left: '31%'}}>
                            <b>Container</b>
                        </div>
                        <div id = "label" onClick={this.createLabel.bind(this)} style={{position: 'relative', height: '50px', width: '200px', left: '20%', top: '0%'}}>
                            Prompt for input:
                        </div>
                        <div id = "label_name"style={{ position: 'relative', top:'-5%', left: '41%'}}>
                            <b>Label</b>
                        </div>
                        <div id = "submit" onClick = {this.createButton.bind(this)}style={{borderWidth: '1px', borderStyle: 'solid', textAlign: 'center', position: 'relative', top:'5%', height: '35px', backgroundColor: 'grey', width: '120px', left: '25%', borderRadius: '5px'}}>
                            Submit
                        </div>
                        <div id = "label_name"style={{ position: 'relative', top: '5%', left: '35%'}}>
                            <b>Button</b>
                        </div>
                        <div id = "textfield" onClick = {this.createTextfield.bind(this)} style={{top: '15%', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black', color: 'lightgrey', position: 'relative', height: '25px', width: '180px', left: '15%', borderRadius: '5px'}}>
                            Input
                        </div>
                        <div id = "textfield_name"style={{ position: 'relative', left: '30%', top: '15%'}}>
                            <b>Textfield</b>
                        </div>
                    </div>
                    <div className="second_column col s10 m6" style={{left: '-100px', height:'600px'}}>
                        <div className = "old_container" id = "old_container" style={{borderStyle: 'solid',borderWidth: '3px', height:'600px'}}>
                        {this.state.items && this.state.items.map(function(item) {
                                return <Rnd bounds={'parent'} default={{x: (item.positionX *2) , y: (item.positionY*2)}} position={{x:item.positionX*2, y:item.positionY * 2}} onResize={this.handleResize.bind(this)} onDrag = {this.handleDrag.bind(this)}><div id = {item.id} onClick = {this.select.bind(this)} style={{borderWidth: item.thickness +'px', fontSize: item.fontSize +'pt', backgroundColor: 
                                item.backgroundColor, borderColor: item.borderColor, width: item.width, left:this.state.x +'px', top: this.state.y +"px", height: item.height, color: item.textColor, borderRadius: item.radius, textAlign: item.textAlign, borderStyle:"solid", }}>{item.text}</div></Rnd>
                             }, this)}
                        </div>
                    </div>
                    <div className="col s5 m3" style={{borderStyle: 'solid', borderWidth: '3px', height:'600px'}}>
                        Properties
                        <div>
                            <input type="text" onChange={this.changeText.bind(this)} style={{height: '30px', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value= {this.state.type}/>
                        </div>
                        <span>
                            <div className="font_size" style={{display: 'margin-right:10px'}}>
                                Font Size:
                                <input type="number" name="quantity" onChange={this.changeFontSize.bind(this)} style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value={this.state.font_size} min="0" step="1"/>
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
                            <input type="number" name="quantity" onChange={this.changeThickness.bind(this)} style={{height: '30px', position: 'relative', left: '5%', width:"20%", borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value={this.state.thickness} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="border_radius_size" style={{display: 'margin-right:10px'}}>
                            Border Radius:
                            <input type="number" name="quantity" onChange={this.changeRadius.bind(this)} style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} value= {this.state.radius} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="position_X" style={{display: 'margin-right:10px'}}>
                            PositionX:
                            <input type="number" name="quantity" value ={this.state.x} onChange={this.changeX.bind(this)} style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="position_Y" style={{display: 'margin-right:10px'}}>
                            PositionY:
                            <input type="number" name="quantity" value ={this.state.y} onChange={this.changeY.bind(this)} style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="width1" style={{display: 'margin-right:10px'}}>
                            Width:
                            <input type="number" name="quantity" value ={this.state.width} onChange = {this.changeWidth.bind(this)} style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
                        </div>
                    </span>
                    <span>
                        <div className="height1" style={{display: 'margin-right:10px'}}>
                            Height:
                            <input type="number" name="quantity" value ={this.state.height} onChange = {this.changeHeight.bind(this)} style={{height: '30px', width:"20%", position: 'relative', left: '5%', borderStyle: 'solid',borderBottom: "solid", borderWidth: '1px', borderRadius: '5px'}} min="0" step="1"/>
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
)(EditScreen)