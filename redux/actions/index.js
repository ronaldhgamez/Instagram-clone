// whenever you want to alter or modify something we call the actions and
// that actions make fetch to database and then alter the state of the component.
import firebase from "firebase";
import { USER_POST_STATE_CHANGE, USER_STATE_CHANGE } from '../constants/index';

export function fetchUser() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log("Does not exist");
        }
      })
  })
}

export function fetchUserPosts() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        /* if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log("Does not exist");
        } */
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data }
        });
        dispatch({ type: USER_POST_STATE_CHANGE, posts })
      })
  })
}