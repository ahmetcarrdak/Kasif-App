import React, { useState, useRef, useEffect } from "react";
import {
  PanGestureHandler,
  GestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Animated as RNAnimated,
  BackHandler,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  withTiming,
  withDelay,
  interpolate,
} from "react-native-reanimated";
import mapStyle from "../components/Styles/MapStyle.json";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import openMap from "react-native-open-maps";

import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

// API
import { useShareContext } from "../API/ShareProvider";
import { useCommentContext } from "../API/CommentProvider";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const { height, width } = Dimensions.get("window");

function Posts() {
  const [isLike, setLiked] = useState(false);
  const [isSend, setSend] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isComment, setComment] = useState(false);
  const lastTap = useRef(0);

  const [isInfoContainer, setInfoContainer] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [isStar, setStar] = useState(false);
  const [isComplaint, setComplaint] = useState(false);
  const slideAnimHeight = useRef(new RNAnimated.Value(0)).current;

  const [isMapContainer, setMapContainer] = useState(false);
  // Önce başlangıç koordinatlarını tanımlayalım (örnek koordinatlar)
  const initialLocation = {
    latitude: 41.2797603168738,
    longitude: 31.423229783407052,
  };

  // selectedLocation state'ini initialLocation ile başlatalım
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // useEffect'i kaldıralım veya sadece konum izni için kullanalım
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Konum izni verilmedi!");
        return;
      }
      // Kullanıcı konumunu almayı kaldırdık
    })();
  }, []);

  const openInMaps = () => {
    openMap({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      query: "Özdemir AVM",
    });
  };

  RNAnimated.timing(slideAnimHeight, {
    toValue: isInfoContainer ? 350 : 0,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const handleRegister = () => {
    setRegistered(!isRegistered);
  };

  const handleStar = () => {
    setStar(!isStar);
  };

  const handleComplaint = () => {
    setComplaint(!isComplaint);
  };

  //@ts-ignore
  const { setShareVisible } = useShareContext();
  //@ts-ignore
  const { setCommentVisible } = useCommentContext();

  // Shared value for y-axis animation
  const translateY = useSharedValue(0);

  // Haptic feedback ve animasyon
  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked((prev) => !prev);
  };

  const handleDoubleClick = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // Çift tıklama aralığı (ms)

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setLiked(true);
    } else {
      lastTap.current = now;
    }
  };

  const handleSend = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSend(true);
    setShareVisible(true);
  };

  const handleComment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setComment(true);
    setCommentVisible(true);
  };

  const images = [
    require("../../assets/img/st3.jpg"),
    require("../../assets/img/pp4.webp"),
  ];

  // Animated styles for the image container
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(-currentImageIndex * height) }],
    };
  });

  // Create shared values for dot animations
  const dotAnimations = images.map(() => useSharedValue(0));

  // Animated style for dots
  const getDotAnimatedStyle = (index: number) => {
    const dotAnimation = dotAnimations[index];
    return useAnimatedStyle(() => {
      const height = interpolate(dotAnimation.value, [0, 1], [8, 30]);
      return {
        height: withTiming(height, { duration: 300 }),
      };
    });
  };

  // Update dot animations when image index changes
  React.useEffect(() => {
    dotAnimations.forEach((dotAnim, index) => {
      dotAnim.value = index === currentImageIndex ? 1 : 0;
    });
  }, [currentImageIndex]);

  const handleGestureEvent = useAnimatedGestureHandler<
    GestureHandlerGestureEvent,
    { startY: number }
  >({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      //@ts-ignore
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      //@ts-ignore

      if (event.translationY < -50 && currentImageIndex < images.length - 1) {
        runOnJS(setCurrentImageIndex)(currentImageIndex + 1);
        //@ts-ignore
      } else if (event.translationY > 50 && currentImageIndex > 0) {
        runOnJS(setCurrentImageIndex)(currentImageIndex - 1);
      }
    },
  });

  return (
    <View
      style={styles.post}
      onStartShouldSetResponder={() => true}
      onResponderRelease={handleDoubleClick}
    >
      <View style={[styles.postHeader, isMapContainer && { display: "none" }]}>
        <View style={styles.headerContent}>
          <Image
            source={require("../../assets/img/pp3.webp")}
            style={styles.postPP}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.postDate}>3 days ago</Text>
          </View>
        </View>

        <View style={styles.dotsContainer}>
          {images.length > 1 &&
            images.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  getDotAnimatedStyle(index),
                  currentImageIndex === index && styles.activeDot,
                ]}
              />
            ))}
        </View>
      </View>

      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View
          style={[
            styles.imageContainer,
            animatedStyle,
            isMapContainer && { display: "none" },
          ]}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={[
                styles.postImage,
                {
                  transform: [{ translateY: index * height }],
                  //width: width,
                  //height: height,
                  width: "100%",
                  height: "100%",
                },
                animatedStyle,
              ]}
              resizeMode="contain"
            />
          ))}
        </Animated.View>
      </PanGestureHandler>

      <View style={[styles.postFooter, isMapContainer && { display: "none" }]}>
        <View style={styles.postDetails}>
          <Text style={styles.whiteText}>23,004 Likes</Text>
          <View style={styles.postDescription}>
            <Text style={styles.whiteText}>Tokio have filme will pro</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>...more</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.commentsText}>View all 1,021 comments</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={[styles.interactionIcons, !isFocused && { display: "none" }]}
          >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setMapContainer(true)}
            >
              <Entypo name="location-pin" size={24} color="white" />
              <Text style={styles.iconText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLike} style={styles.iconContainer}>
              <AntDesign
                name={isLike ? "heart" : "hearto"}
                size={24}
                color={isLike ? "#ff0000" : "white"}
              />
              <Text style={styles.iconText}>4.2K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={handleSend}>
              <Octicons
                name="paper-airplane"
                size={24}
                color="white"
                style={{ transform: [{ rotate: "-30deg" }] }}
              />
              <Text style={styles.iconText}>120</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleComment}
            >
              <MaterialCommunityIcons
                name="comment-processing-outline"
                size={24}
                color="white"
              />
              <Text style={styles.iconText}>300</Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.postButton}
          >
            <TouchableOpacity
              style={styles.postButtonSect}
              onPress={() => setFocused(!isFocused)}
            >
              <FontAwesome5
                name={isFocused ? "times" : "plus"}
                size={14}
                color={"white"}
              />
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => setInfoContainer(true)}
          >
            <Entypo name="dots-three-horizontal" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <RNAnimated.View
        style={[
          styles.postInfo,
          {
            height: slideAnimHeight,
          },
        ]}
      >
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => setInfoContainer(false)}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#d955d0",
            }}
          >
            Kapat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postInfoButton}
          onPress={handleRegister}
        >
          <Text>{isRegistered ? "Etkinlikten ayrıl" : "Etkinliğe katıl"}</Text>
          <AntDesign
            name={isRegistered ? "like1" : "like2"}
            size={20}
            color={"#00ffee"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postInfoButton} onPress={handleStar}>
          <Text>{isStar ? "Yıldızlama" : "Yıldızla"}</Text>
          <AntDesign
            name={isStar ? "star" : "staro"}
            size={20}
            color={"#ffdd00"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.postInfoButton,
            isComplaint && { backgroundColor: "red" },
          ]}
          onPress={handleComplaint}
        >
          <Text style={isComplaint ? { color: "white" } : { color: "red" }}>
            {" "}
            {isComplaint ? "Şikayet etme" : "Şikayet et"}{" "}
          </Text>
          <Foundation
            name="alert"
            size={20}
            style={isComplaint ? { color: "white" } : { color: "red" }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postInfoButton}>
          <Text>Kullanıcı profilini gör</Text>
          <Image
            source={require("../../assets/img/profilePhoto1.jpg")}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </TouchableOpacity>
      </RNAnimated.View>
      <View
        style={[styles.mapContainer, !isMapContainer && { display: "none" }]}
      >
        <MapView
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
          customMapStyle={mapStyle}
          region={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={false}
        >
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            //title="Seçilen Konum"
            pinColor="red"
          />
        </MapView>
        <TouchableOpacity
          onPress={openInMaps}
          style={{
            backgroundColor: "green",
            width: 40,
            height: 40,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 30,
            right: 10,
          }}
        >
          <FontAwesome5 name="map-marked-alt" size={15} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMapContainer(false)}
          style={{
            backgroundColor: "red",
            width: 40,
            height: 40,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 80,
            right: 10,
          }}
        >
          <FontAwesome5 name="times" size={15} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    height: 450,
    width: "95%",
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "black",
    padding: 0,
    alignSelf: "center",
    marginTop: 10,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    padding: 20,
    position: "absolute",
    width: "100%",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  postPP: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  postDate: {
    fontSize: 14,
    color: "white",
  },
  dotsContainer: {
    flexDirection: "column",
    top: 20,
    right: 20,
    position: "absolute",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 3,
    marginVertical: 2,
  },
  activeDot: {
    width: 8,
    height: 30,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    position: "absolute",
    top: 0,
  },
  postImage: {
    position: "absolute",
    top: 0,
  },
  postFooter: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
    bottom: 10,
  },
  postDetails: {
    flex: 1,
  },
  whiteText: {
    color: "#fff",
  },
  postDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  moreText: {
    color: "#bababa",
  },
  commentsText: {
    color: "#bababa",
  },
  interactionIcons: {
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  iconText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 3,
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
  postInfo: {
    backgroundColor: "white",
    borderRadius: 40,
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 100,
  },
  postInfoButton: {
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: "#bababa",
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Posts;
