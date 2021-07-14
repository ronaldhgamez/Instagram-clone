import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
require('firebase/firebase-storage')

export default function Search(props) {
  const [users, setUsers] = useState([])

  const fetchUsers = (search) => {
    firebase.firestore().collection("users")
      .where("name", ">=", search)
      .get()
      .then(snapshot => {
        let users = snapshot.docs.map(doc => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data }
        })
        setUsers(users);
      })
  }

  return (
    <View>
      <TextInput placeholder="Type here..." onChangeText={(search) => fetchUsers(search)} />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => props.navigation.navigate("Profile", { uid: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
