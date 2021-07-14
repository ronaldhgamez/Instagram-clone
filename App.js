import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase';

// Remember to hide it when putting it to production with enviroment variables *?*
const firebaseConfig = {
  apiKey: "AIzaSyBdf5wlBM0dJqh16l7uG-4f72TTyNqhRWg",
  authDomain: "instagram-dev-16053.firebaseapp.com",
  projectId: "instagram-dev-16053",
  storageBucket: "instagram-dev-16053.appspot.com",
  messagingSenderId: "924441216312",
  appId: "1:924441216312:web:a8eee5f1c9450af1e7edcd",
  measurementId: "G-LSDMN0PCQJ"
};

// Makes sure we are not running any firebase instance at the moment.
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'; // allows us to use the dispatch functions
const store = createStore(rootReducer, applyMiddleware(thunk));


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import MainScreen from './components/Main';
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true })
      } else {
        this.setState({ loggedIn: true, loaded: true })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return <>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      </>
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">

            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  }
}