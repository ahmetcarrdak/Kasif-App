import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function MessagesScreen() {
  const navigation = useNavigation();
  const [isSelected, setSelected] = useState(1);

  const handleLongPress = () => {
    //console.error("basılı tutuldu");
  };

  const handleNavigate = (id: number) => {
    //@ts-ignore
    navigation.navigate("UserMessage", { id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={"white"}
          ></MaterialIcons>
        </TouchableOpacity>
        <Text style={styles.headerText}>Messages</Text>
        <TouchableOpacity>
          <EvilIcons name="search" size={30} color={"white"}></EvilIcons>
        </TouchableOpacity>
      </View>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.topBarButton}
          onPress={() => setSelected(1)}
        >
          <Text
            style={[styles.topBarText, isSelected === 1 && { color: "white" }]}
          >
            Primary
          </Text>
          {isSelected === 1 && <View style={styles.topBarDot}></View>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topBarButton}
          onPress={() => setSelected(2)}
        >
          <Text
            style={[styles.topBarText, isSelected === 2 && { color: "white" }]}
          >
            General
          </Text>
          {isSelected === 2 && <View style={styles.topBarDot}></View>}
        </TouchableOpacity>
      </View>

      <View style={{ height: "55%" }}>
        {isSelected === 1 && (
          <ScrollView style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={styles.messageButton}
              onLongPress={handleLongPress}
              onPress={() => handleNavigate(1)}
            >
              <Image
                style={styles.backgroundImage}
                source={require("../../assets/img/bannerImage.jpg")}
              ></Image>
              <Image
                style={styles.profilePhoto}
                source={require("../../assets/img/profilePhoto1.jpg")}
              ></Image>
              <View style={styles.Texts}>
                <View style={styles.messageTopTexts}>
                  <Text style={styles.userName}>Jhon Doe</Text>
                  <Text style={styles.time}>3 m ago</Text>
                </View>
                <Text style={styles.message}>
                  Lorem ipsum dolor sit amet...
                </Text>
              </View>
              <LinearGradient
                colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <Text style={{ color: "white" }}>3</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
        {isSelected === 2 && (
          <ScrollView style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity style={styles.messageButton}>
              <Image
                style={styles.backgroundImage}
                source={require("../../assets/img/bannerImage.jpg")}
              ></Image>
              <Image
                style={styles.profilePhoto}
                source={require("../../assets/img/profilePhoto1.jpg")}
              ></Image>
              <View style={styles.Texts}>
                <View style={styles.messageTopTexts}>
                  <Text style={styles.userName}>Jhon Doe</Text>
                  <Text style={styles.time}>3 m ago</Text>
                </View>
                <Text style={styles.message}>
                  Lorem ipsum dolor sit amet...
                </Text>
              </View>
              <LinearGradient
                colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <Text style={{ color: "white" }}>3</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.NewContainer}>
          <TouchableOpacity>
            <LinearGradient
              colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.new}
            >
              <View style={styles.inlineNew}>
                <Octicons name="pencil" size={30} color={"white"}></Octicons>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.messageContainer}>
          <TouchableOpacity>
            <Feather name="camera" size={20} color={"white"} />
          </TouchableOpacity>
          <TextInput
            placeholder="message"
            style={styles.input}
            placeholderTextColor={"#ddd"}
          />
          <LinearGradient
            colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.postButton}
          >
            <TouchableOpacity style={styles.postButtonSect}>
              <Ionicons name={"add"} size={14} color={"white"} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241701",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  topBar: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  topBarButton: {
    flexDirection: "column",
    alignItems: "center",
  },
  topBarText: {
    color: "#9e9e9e",
    fontSize: 14,
    marginTop: 5,
  },
  topBarDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 5,
  },
  messageButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    overflow: "hidden",
    maxHeight: 100,
    borderRadius: 20,
    width: "100%",
    marginBottom: 10,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },
  Texts: {
    marginLeft: "3.5%",
  },
  messageTopTexts: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  time: {
    fontSize: 14,
    color: "#7d7d7d",
    marginLeft: 10,
  },
  message: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
  },
  gradientBorder: {
    marginLeft: "20%",
    borderRadius: 12.5,
    height: 25,
    width: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { marginTop: 10 },
  NewContainer: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  new: {
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  inlineNew: {
    width: 55,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22.75,
    backgroundColor: "#6f3bb3",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginHorizontal: "5%",
    borderWidth: 0.2,
    borderColor: "#636363",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  input: {
    width: "78%",
    marginLeft: "4%",
    color: "#ddd",
  },
  postButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  postButtonSect: {
    backgroundColor: "black",
    width: 28,
    height: 28,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessagesScreen;
