import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {deleteItemRegister} from '../../store/database/asynchHandler';
import {moveUpRegister} from '../../store/database/asynchHandler';
import {moveDownRegister} from '../../store/database/asynchHandler';
import { Modal, Button, Icon } from 'react-materialize';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
class ItemCard extends React.Component {
    isCompleted(){
        return this.props.item.completed ? {color: 'green'} : {color: 'red'}; 
    }

    deleteItem = (e) =>{
        e.preventDefault();
        this.props.delete_item(this.props.todoList, this.props.item);
    }

    moveUp = (e) =>{
        e.preventDefault();
        this.props.move_up(this.props.todoList, this.props.item);
    }

    moveDown = (e) =>{
        e.preventDefault();
        this.props.move_down(this.props.todoList, this.props.item);
    }

    preventClick = (e)=>{
        e.preventDefault();
    }

    componentDidMount(){
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {direction: 'left'});
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link white lighten-3">
                <Link to={"/todoList/" + this.props.todoList.id + "/items/" + this.props.item.key}>
                <div className="card-content grey-text text-darken-3" onClick = {this.editItem}>
                    <span className="description_text">{item.description}</span>
                    <span className="assigned_to_text">Assigned To: {item.assigned_to}</span>
                    <span className="due_date_text">{item.due_date}</span>
                    <span className="status_text" style={this.isCompleted()}>{item.completed ? "Completed" : "Pending"}</span>
                        <div class="fixed-action-btn" onClick={this.preventClick} style={{position: 'absolute', top: '10%', left: '95.25'}}>
                            <a class="btn-floating btn-medium blue lighten-2">
                                <i class="large material-icons">mode_edit</i>
                            </a>
                            <ul>
                                <li><a class="btn-floating green btn-small" onClick={this.moveUp} style={{position: 'absolute', top: '40%', left: '86%'}}><i class="material-icons">keyboard_arrow_up</i></a></li>
                                <li><a class="btn-floating orange btn-small" onClick={this.moveDown} style={{position: 'absolute', top: '40%', left: '92.25%'}}><i class="material-icons">keyboard_arrow_down</i></a></li>
                                <li><a class="btn-floating red btn-small" onClick={this.deleteItem} style={{position: 'absolute', top: '40%', left: '98.5%'}}><i class="material-icons">clear</i></a></li>
                            </ul>
                        </div>
                </div>
                </Link>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    delete_item: (todoList, item)=> dispatch(deleteItemRegister(todoList, item)),
    move_up: (todoList, item) => dispatch(moveUpRegister(todoList, item)),
    move_down: (todoList, item) => dispatch(moveDownRegister(todoList, item)),
})

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists',  orderBy:['pos']  }
  ]),
)(ItemCard);