import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'

import firebase from 'firebase'

export default class Login extends Component {

  constructor(props) { // First the function to be call whenever a component is created
    super(props);

    this.state = {
      email: '',
      password: ''
    }
    // to access from onSignIn method to the state
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(((result) => {
        console.log(result)
      }))
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Sign In" onPress={() => this.onSignIn()} />
      </View>
    )
  }
}
