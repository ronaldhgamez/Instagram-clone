import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'

import firebase from 'firebase'

export default class Register extends Component {

  constructor(props) { // First the function to be call whenever a component is created
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    }
    // to access from onSignIn method to the state
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(((result) => { // Saves the Autentication into Firestore
        
        console.log(result)
        // Get the id given by firebase once a user sign up
        const user_id = firebase.auth().currentUser.uid;
        console.log("user_id" + user_id);
        // Saves the user data in the collections
        firebase.firestore().collection("users").doc(user_id).set({
          name, 
          email
        })
      }))
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Sign Up" onPress={() => this.onSignUp()} />
      </View>
    )
  }
}
