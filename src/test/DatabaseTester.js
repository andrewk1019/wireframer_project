import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestWireframeData.json'
import { NavLink, Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        var count = 0;
        todoJson.wireframes.forEach(todoListJson => {
            fireStore.collection('wireframes').add({
                    name: todoListJson.name,
                    owner: this.props.auth.email,
                    items: todoListJson.controls,
                    pos: count++,
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        if(this.props.auth.uid){
            var owner = this.props.auth.email;
            getFirestore().collection('users').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    if(doc.data().owner == owner){
                        if(!doc.data().admin){
                            return <Redirect to="/"/>
                        }
                    }
                })
              });
        }

        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);