// visual studion package: ES7 react/react native
// rcf: Creates a react function component automatically
import React from 'react'
import { Text, View, Button } from 'react-native'

export default function Landing({ navigation }) { // Give us the access to router or navigation container
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  )
}
