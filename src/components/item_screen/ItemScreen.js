import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {submitRegister} from '../../store/database/asynchHandler';
import { Modal, Button } from 'react-materialize';
import { Checkbox } from 'react-materialize';

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
class ItemScreen extends Component {
    state = {
      task: this.props.wireframe && this.props.wireframe.items.length != this.props.wireframe.key ? this.props.wireframe.items[this.props.wireframe.key].description : '',
      assigned_to: this.props.wireframe  && this.props.wireframe.items.length != this.props.wireframe.key ? this.props.wireframe.items[this.props.wireframe.key].assigned_to : '',
      due_date: this.props.wireframe && this.props.wireframe.items.length != this.props.wireframe.key  ? this.props.wireframe.items[this.props.wireframe.key].due_date : '',
      completed: this.props.wireframe && this.props.wireframe.items.length != this.props.wireframe.key && this.props.wireframe.items[this.props.wireframe.key].completed ? true : false,
    }

    submitButton = () =>{
      this.props.submit(this.props.wireframe, this.state.task, this.state.assigned_to, this.state.due_date, this.state.completed, this.props.history);
    }

    cancelButton = () =>{
      this.props.history.push('/wireframe/' + this.props.wireframe.id);
    }
    onChangeTask=(event) =>{
      this.setState({
         task: event.target.value
      })

  }

  onChangeAssigned = (event) =>{
      this.setState({
          assigned_to: event.target.value
      })
  }
  
  onChangeDueDate = (event) =>{
      this.setState({
          due_date: event.target.value
      })
  }

  onChangeCompleted = (event) =>{
      this.setState({
          completed: event.target.checked
      })
      this.state.completed = event.target.checked;
  }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Item</h5>
                <div className="input-field">
                    <label className = "active"htmlFor="email">Task</label>
                    <input className="active" type="text" name="name" id="name" onChange = {this.onChangeTask} defaultValue={this.state.task}/>
                </div>
                <div className="input-field">
                    <label className = "active" htmlFor="email">Assigned To</label>
                    <input className="active" type="text" name="name" id="name" onChange = {this.onChangeAssigned} defaultValue={this.state.assigned_to}/>
                </div>
                <div className="input-field">
                    <label className = "active" htmlFor="email" className = "active">Due Date</label>
                    <input className="active" type="date" name="name" id="name" onChange = {this.onChangeDueDate} defaultValue={this.state.due_date}/>
                </div>
                <div className="input-field">
                  <span>
                   <Checkbox value = "Completed" label= "Completed" checked = {this.state.completed} onChange={this.onChangeCompleted}></Checkbox>
                   </span>
                </div>
                <div className="input-field"><span><Button className="submit_button"onClick={this.submitButton}>Submit</Button><Button className="cancel_button"onClick={this.cancelButton}>Cancel</Button></span></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const {key} = ownProps.match.params;
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
  if(wireframe)
    wireframe.id = id;
    wireframe.key = key;
  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  submit: (wireframe, t, a, d, c, history) => dispatch(submitRegister(wireframe,t, a, d, c, history)),

})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes',  orderBy:['pos']  }
  ]),
)(ItemScreen);