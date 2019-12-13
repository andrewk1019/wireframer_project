import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        owner: newUser.email,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`, 
        admin: false,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const updateRegister = (wireframe, owner1) => (dispatch, getState, { getFirestore }) => {
  console.log(wireframe)
  var firestore = getFirestore();
  firestore.collection("wireframes").doc(wireframe.id).update({name : wireframe.name, owner: owner1})
};

export const submitRegister = (wireframe, t, a, d, c, history) => (dispatch, getState, { getFirestore }) => {
  var firestore = getFirestore();
  wireframe.items[wireframe.key] = ({ 'assigned_to': a, 'completed': c,'description': t,'due_date': d, 'key': wireframe.key});
  firestore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
  history.push('/wireframes/' + wireframe.id);
};
export const moveToTopRegister = (wireframe) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  var cur_pos = wireframe.pos;
  if(cur_pos != 0){
  fireStore.collection('wireframes').get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc) {
        if(doc.data().pos == cur_pos){
          var position = doc.data().pos = 0;
          fireStore.collection('wireframes').doc(doc.id).update({pos: position});
        }
        else if(doc.data().pos < cur_pos){
          var position = doc.data().pos + 1;
          fireStore.collection('wireframes').doc(doc.id).update({pos: position});
        }
    })

  });
}
};

export const createRegister = (props) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  fireStore.collection('wireframes').add({
    name: "Unknown",
    owner: getState().firebase.auth.email,
    items: [],
    pos: -1}).then(
        function(docRef){
            props.push("/wireframe/"+ docRef.id);
    });
  
  fireStore.collection('wireframes').get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc) {
        var position = doc.data().pos + 1;
        fireStore.collection('wireframes').doc(doc.id).update({pos: position});
    })
  });
};

export const sortTaskRegister = (wireframe, bool) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  if(bool){
    wireframe.items.sort(function(a, b){
          if(a.description < b.description) { return -1; }
          else if(a.description > b.description) { return 1; }
          return 0;
    })
  }
  else{
    wireframe.items.sort(function(a, b){ //reverse
      if(a.description > b.description) { return -1; }
      else if(a.description < b.description) { return 1; }
      return 0;
})
  }
  for(var i = 0; i < wireframe.items.length; i++){
    wireframe.items[i].key = i;
  }
  fireStore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
}

export const sortDueDateRegister = (wireframe, bool) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  if(bool){
    wireframe.items.sort(function(a, b){
        if(a.due_date < b.due_date) { return -1; }
        else if(a.due_date > b.due_date) { return 1; }
        return 0;
    })
  }
  else{
    wireframe.items.sort(function(a, b){ //reverse
      if(a.due_date > b.due_date) { return -1; }
      else if(a.due_date < b.due_date) { return 1; }
      return 0;
  })
  }
  for(var i = 0; i < wireframe.items.length; i++){
    wireframe.items[i].key = i;
  }
  fireStore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
}

export const sortCompletedRegister = (wireframe, bool) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  if(bool){
    wireframe.items.sort(function(a, b){
        if(a.completed < b.completed) { return 1; } //we use boolean instead of string
        else if(a.completed > b.completed) { return -1; }
        return 0;
    })
  }
  else{
    wireframe.items.sort(function(a, b){
      if(a.completed > b.completed) { return 1; } //reverse
      else if(a.completed < b.completed) { return -1; }
      return 0;
  })
  }
  for(var i = 0; i < wireframe.items.length; i++){
    wireframe.items[i].key = i;
  }
  fireStore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
}

export const deleteItemRegister = (wireframe, item) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  for(var i = item.key+1; i < wireframe.items.length; i++){
    wireframe.items[i].key = wireframe.items[i].key - 1;
  }
  wireframe.items = wireframe.items.filter(item1 => item1 !== item);
  fireStore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
}

export const moveUpRegister = (wireframe, item) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  var index = wireframe.items.indexOf(item);
  if(index != 0){
    var item1 = wireframe.items[index];
    var item2 = wireframe.items[index - 1];
    wireframe.items[index] = item2;
    wireframe.items[index - 1] = item1;
    wireframe.items[index].key = wireframe.items[index].key + 1;
    wireframe.items[index - 1].key = wireframe.items[index - 1].key - 1;
    fireStore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
  }
}

export const moveDownRegister = (wireframe, item) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  var index = wireframe.items.indexOf(item);
  if(index != wireframe.items.length - 1){
    var item1 = wireframe.items[index];
    var item2 = wireframe.items[index + 1];
    wireframe.items[index] = item2;
    wireframe.items[index + 1] = item1;
    wireframe.items[index].key = wireframe.items[index].key - 1;
    wireframe.items[index + 1].key = wireframe.items[index + 1].key + 1;
    fireStore.collection("wireframes").doc(wireframe.id).update({items:wireframe.items});
  }
}
