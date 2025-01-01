import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function DiscoveryScreen() {
  const [isFocused, setIsFocused] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const closedContainerAndInput = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View
        style={[styles.container, isFocused && { backgroundColor: "#d9d9d9" }]}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={"#a1a1a1"} />
            <TextInput
              placeholder="Ara.."
              style={styles.input}
              onFocus={() => setIsFocused(true)}
            />
            {isFocused && (
              <TouchableOpacity onPress={closedContainerAndInput}>
                <FontAwesome name="times" size={20} color={"#c92281"} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {isFocused && (
            <ScrollView style={styles.searchContainer}>
              <TouchableOpacity style={styles.profileContainer}>
                <Image
                  source={require("../../assets/img/profilePhoto1.jpg")}
                  style={styles.profilePhoto}
                />
                <Text style={styles.profileText}>Jhon Doe</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.postsContainer}>
            <TouchableOpacity style={styles.post}>
              <Image
                source={require("../../assets/theme/tema1.jpg")}
                style={styles.postPhoto}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 29,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 10,
  },
  input: {
    marginLeft: 13,
    width: "83%",
  },
  searchContainer: {
    height: "100%",
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  profileText: {
    marginLeft: 15,
    fontSize: 15,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  post: {
    width: 80,
    height: 130,
    marginBottom: 15,
  },
  postPhoto: {
    width: "100%",
    height: 130,
    borderRadius: 20,
  },
});

export default DiscoveryScreen;
