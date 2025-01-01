import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useShareContext } from "../API/ShareProvider";

const { width, height } = Dimensions.get("window");

interface Logo {
  source: any;
  position: {
    left: number;
    top: number;
  };
}

const ICON_SIZE = 70;
const LOGO_DATA: Logo[] = [
  {
    source: require("../../assets/img/pp2.jpeg"),
    position: { left: 5, top: 15 },
  },
  {
    source: require("../../assets/img/pp3.webp"),
    position: { left: 85, top: 50 },
  },
  {
    source: require("../../assets/img/pp4.webp"),
    position: { left: 155, top: 100 },
  },
  {
    source: require("../../assets/img/profilePhoto1.jpg"),
    position: { left: 205, top: 170 },
  },
];

const ShareContainer = () => {
  //@ts-ignore
  const { isShareVisible, setShareVisible } = useShareContext();
  const slideAnimBottom = useRef(new Animated.Value(height)).current;
  const slideAnimLeft = useRef(new Animated.Value(0)).current;
  const [isFocused, setFocused] = useState(false);
  const [selectedLogos, setSelectedLogos] = useState<number[]>([]); // Track selected logos

  useEffect(() => {
    // Update the focused state based on the selectedLogos array
    setFocused(selectedLogos.length > 0);

    Animated.timing(slideAnimBottom, {
      toValue: isShareVisible ? height / 2 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(slideAnimLeft, {
      toValue: isShareVisible ? width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isShareVisible, selectedLogos]);

  if (!isShareVisible) return null;

  const toggleSelection = (index: number) => {
    if (selectedLogos.includes(index)) {
      // If already selected, remove it from the array
      setSelectedLogos(selectedLogos.filter((i) => i !== index));
    } else {
      // If not selected, add it to the array
      setSelectedLogos([...selectedLogos, index]);
    }
  };

  const renderLogo = (logo: Logo, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.logoContainer, logo.position]}
      onPress={() => toggleSelection(index)} // Toggle selection on press
    >
      <Image source={logo.source} style={styles.logo} />
      {selectedLogos.includes(index) && ( // Render checkmark if logo is selected
        <Ionicons
          name="checkmark"
          size={10}
          color={"white"}
          style={styles.checkmark}
        />
      )}
    </TouchableOpacity>
  );

  const handleShare = () => {
    console.log("paylaş");
  };

  const handleCreate = () => {
    console.log("oluştur");
  };

  return (
    <>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShareVisible(false)}
      >
        <Ionicons name="close" color={"white"} size={25} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.container,
          {
            height: slideAnimBottom,
            width: slideAnimLeft,
          },
        ]}
      >
        {LOGO_DATA.map(renderLogo)}

        {/* Add new button with gradient border */}
        <LinearGradient
          colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.logoContainerCentered}>
            <TouchableOpacity style={styles.addIconContainer}>
              <Ionicons name="add" size={30} color={"white"} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
              <Ionicons
                name={isFocused ? "send-outline" : "add"}
                size={14}
                color={"white"}
                onPress={isFocused ? handleShare : handleCreate}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    padding: 15,
    backgroundColor: "black",
    position: "absolute",
    bottom: 300,
    right: 30,
    borderRadius: 50,
    zIndex: 10,
  },
  container: {
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: "100%",
    backgroundColor: "black",
    paddingTop: 20,
    zIndex: 5,
    overflow: "hidden",
    bottom: 0,
    left: 0,
  },
  logoContainer: {
    position: "absolute",
  },
  logo: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  checkmark: {
    position: "absolute",
    padding: 7,
    borderRadius: 10,
    backgroundColor: "#455ede",
    zIndex: 10,
    bottom: 0,
    right: 0,
  },
  gradientBorder: {
    position: "absolute",
    left: 240,
    top: 250,
    width: ICON_SIZE + 1,
    height: ICON_SIZE + 1,
    borderRadius: (ICON_SIZE + 10) / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 8,
  },
  logoContainerCentered: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  addIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
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

export default ShareContainer;
