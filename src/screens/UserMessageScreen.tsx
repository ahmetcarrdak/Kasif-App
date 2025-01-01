import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const UserMessageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const fetchMessageById = (messageId: number) => {
    return `Message with ID: ${messageId}`;
  };

  const handleMessageInfo = (userId: number) => {
    //@ts-ignore
    navigation.navigate("MessageInfo", { userId });
  };

  const ContainerHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={30}
          color={"white"}
        ></MaterialIcons>
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <Image
          source={require("../../assets/img/pp4.webp")}
          style={styles.profilePhoto}
        ></Image>
        <View style={styles.headerInfoText}>
          <Text style={styles.name}>Jhon</Text>
          <Text style={styles.active}>Active today</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            name="videocam-outline"
            size={35}
            color={"white"}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome6 name="phone" size={22} color={"white"}></FontAwesome6>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={1}
          //@ts-ignore
          onPress={() => handleMessageInfo(1)}
        >
          <AntDesign name="infocirlce" size={22} color={"white"}></AntDesign>
        </TouchableOpacity>
      </View>
    </View>
  );

  const InputContainer = () => (
    <View style={styles.inputContainer}>
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
        style={styles.inputButton}
      >
        <TouchableOpacity style={styles.inputButtonSect}>
          <Ionicons name={"send-outline"} size={14} color={"white"} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const FromMessageText = ({ message }: { message: string }) => (
    <>
      <View style={styles.fromMessage}>
        <Image
          source={require("../../assets/img/pp2.jpeg")}
          style={styles.messagePP}
        />
        <Text style={styles.messageText}> {message} </Text>
      </View>
    </>
  );

  const ToMessageText = ({ message }: { message: string }) => (
    <>
      <View style={styles.ToMessage}>
        <LinearGradient
          colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder} // LinearGradient için stiller
        >
          <View style={styles.innerContent}>
            <Text style={styles.ToMessageText}>{message}</Text>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const FromMessagePost = ({
    image,
    username,
    description,
  }: {
    image: string;
    username: string;
    description: string;
  }) => (
    <>
      <View style={styles.fromMessage}>
        <Image
          source={require("../../assets/img/pp2.jpeg")}
          style={styles.messagePP}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.postContainer,
            { marginLeft: 20, borderWidth: 0.3, borderColor: "gray" },
          ]}
        >
          <Image source={{ uri: image }} style={styles.postImage} />
          <Text style={styles.postUsername}>@{username}</Text>
          <Text style={styles.postDesc}> {description} </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const ToMessagePost = ({
    image,
    username,
    description,
  }: {
    image: string;
    username: string;
    description: string;
  }) => (
    <>
      <View style={styles.ToMessage}>
        <LinearGradient
          colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder} // LinearGradient için stiller
        >
          <TouchableOpacity activeOpacity={1} style={[styles.postContainer]}>
            <Image source={{ uri: image }} style={styles.postImage} />
            <Text style={styles.postUsername}>@{username}</Text>
            <Text style={styles.postDesc}> {description} </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );

  const FromImage = ({ image }: { image: string }) => (
    <>
      <View style={styles.fromMessage}>
        <Image source={{ uri: image }} style={styles.messagePP} />
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.postContainer,
            { marginLeft: 20, borderWidth: 0.3, borderColor: "gray" },
          ]}
        >
          <Image
            source={{ uri: image }}
            style={[styles.postImage, { borderRadius: 12 }]}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const ToImage = ({ image }: { image: string }) => (
    <>
      <View style={styles.ToMessage}>
        <LinearGradient
          colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder} // LinearGradient için stiller
        >
          <TouchableOpacity activeOpacity={1} style={[styles.postContainer]}>
            <Image
              source={{ uri: image }}
              style={[styles.postImage, { borderRadius: 12 }]}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/img/backgroundVertical.jpg")}
        style={styles.background}
      ></Image>
      <ContainerHeader />
      <ScrollView
        style={[styles.messageScrollContainer]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Mesajlar buraya gelecek */}
      </ScrollView>
      <InputContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 45,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "gray",
    marginBottom: 10,
    marginLeft: 20,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfoText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    color: "white",
  },
  active: {
    color: "gray",
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 12,
  },
  headerButton: {
    marginHorizontal: "2%",
  },
  messageScrollContainer: {
    overflow: "hidden",
    marginTop: 110,
    marginBottom: 50,
  },
  fromMessage: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ToMessage: {
    width: "100%",
    marginBottom: 20,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  messagePP: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  messageText: {
    padding: 20,
    maxWidth: "70%",
    backgroundColor: "black",
    borderRadius: 20,
    color: "white",
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 20,
  },
  ToMessageText: {
    backgroundColor: "black",
    borderRadius: 20,
    color: "white",
    borderWidth: 1,
    marginLeft: 20,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 14,
    maxWidth: "80%",
  },
  innerContent: {
    backgroundColor: "black",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    bottom: 35,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginHorizontal: "2.5%",
    borderWidth: 0.2,
    borderColor: "#636363",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: "black",
  },
  input: {
    width: "80%",
    marginLeft: "4%",
    color: "#ddd",
  },
  inputButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  inputButtonSect: {
    backgroundColor: "black",
    width: 28,
    height: 28,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    backgroundColor: "#f5f5",
    borderRadius: 12,
  },
  postImage: {
    width: 230,
    height: 210,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  postUsername: {
    color: "#f5f5f5",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  postDesc: {
    color: "#f5f5f5",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default UserMessageScreen;
