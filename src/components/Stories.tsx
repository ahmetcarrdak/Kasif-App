import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const STORIES_DATA = [
  {
    id: 1,
    username: "user1",
    profileImage: require("../../assets/img/profilePhoto1.jpg"),
    stories: [
      {
        id: 1,
        image: require("../../assets/img/stroies1.jpeg"),
        duration: 5000,
      },
      {
        id: 2,
        image: require("../../assets/img/backgroundVertical.jpg"),
        duration: 5000,
      },
    ],
  },
  {
    id: 2,
    username: "user2",
    profileImage: require("../../assets/img/pp2.jpeg"),
    stories: [
      { id: 1, image: require("../../assets/img/st3.jpg"), duration: 5000 },
      { id: 2, image: require("../../assets/img/st4.jpg"), duration: 5000 },
    ],
  },
];

function Stories() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity style={styles.storyAdd}>
          <Ionicons name="add" size={25} color={"white"} />
          <Image
            source={require("../../assets/img/profilePhoto1.jpg")}
            style={styles.profilePhoto}
          />
        </TouchableOpacity>
        {STORIES_DATA.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.storyAdd}
            onPress={() => {
              //@ts-ignore
              /*
              navigation.navigate("StoryViewer", {
                userId: user.id,
                STORIES_DATA,
              });
              */
              //@ts-ignore
              navigation.navigate("StoryViewerPage", {
                userId: user.id,
                STORIES_DATA
              });
            }}
          >
            <Image source={user.stories[0].image} style={styles.storiesImage} />
            <Image source={user.profileImage} style={styles.profilePhoto} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  storyAdd: {
    width: 80,
    height: 130,
    borderWidth: 0.2,
    borderRadius: 25,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginBottom: 10,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
    bottom: -20,
  },
  storiesImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
});

export default Stories;
