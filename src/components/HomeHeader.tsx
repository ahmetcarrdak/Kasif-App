import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

function HomeHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Kaşif</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          //@ts-ignore
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Ionicons name="add-circle-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          //@ts-ignore
          onPress={() => navigation.navigate("Messages")}
        >
          <Feather name="send" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default HomeHeader;
