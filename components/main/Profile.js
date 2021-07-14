import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
//import { Avatar } from 'react-native-eleme';
import { connect } from 'react-redux';

function Profile(props) {

  const { currentUser, posts } = props;

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image
                source={{ uri: item.downloadUrl }}
                style={styles.image}
              />
            </View>
          )}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)
// first data, and the actions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3, // to  fix image to the same size of all

  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    width: 100, // discoment for pc
    height: 100// only works in phone
  }
})