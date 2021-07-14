import React, { useState } from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'

import firebase from 'firebase';
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {

  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob) // to upload

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      })
    }
    const taskError = snapshot => {
      console.log(snapshot);
    }
    task.on("state-changed", taskProgress, taskError, taskCompleted); // do not change the order
  }

  const savePostData = (downloadUrl) => {
    firebase.firestore().collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts").add({
        caption,
        downloadUrl,
        creation: firebase.firestore.FieldValue.serverTimestamp() // get server date
      }).then((function () {
        props.navigation.popToTop() // Go to main component
      }))
  }

  return (
    <View style={{ flex: 1, }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  )
}
