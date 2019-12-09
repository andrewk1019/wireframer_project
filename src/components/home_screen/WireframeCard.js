import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Button } from 'react-materialize';
import {getFirestore} from 'redux-firestore';

class WireframeCard extends React.Component {
    openDialog(e){
        e.preventDefault();
    }
    dialog(e){
        e.preventDefault();
    }
    deleteWireframe(e){
        e.preventDefault();
        var firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).delete();
    }
    render() {
        const { wireframe } = this.props;
        return (
            <div className="card z-depth-0 todo-list-link" style={{borderRadius: '10px', backgroundColor: 'transparent'}}>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title" style={{fontSize: '14pt'}}>{wireframe.name}
                    <Modal header = "Delete wireframe?" onClick = {this.dialog.bind(this)} actions = {<div>
                    <Button onClick={this.deleteWireframe.bind(this)}>Yes</Button>
                    <Button modal="close">No</Button>
                        </div>}trigger={<div id = 'dialog' onClick ={this.openDialog.bind(this)} style={{fontSize:'20pt', position: 'absolute', top: '28%', left: '90%'}}><b>X</b></div>}>
                        <p></p>
                        <div id ="inner_text">Are you sure you want to delete this wireframe?
                        <div id = "inner_text">The wireframe will not be retrievable.</div>
                        <p></p>
                        </div>
                    </Modal>
                    </span>
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
})
export default compose(
    connect(mapDispatchToProps),
  )(WireframeCard);