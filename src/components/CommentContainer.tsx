import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import {
  PanGestureHandler,
  GestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { useCommentContext } from "../API/CommentProvider";
const { width, height } = Dimensions.get("window");

function CommentContainer() {
  //@ts-ignore
  const { isCommentVisible, setCommentVisible } = useCommentContext();
  const slideAnimHeight = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [isScrollTop, setScrollTop] = useState(false);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    Animated.timing(slideAnimHeight, {
      toValue: isCommentVisible ? height / 2 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isCommentVisible]);

  const handleGestureEnd = (event: GestureHandlerGestureEvent) => {
    //@ts-ignore
    if (event.nativeEvent.translationY > 100) {
      setScrollTop(false);
      setCommentVisible(false);
      //@ts-ignore
    } else if (event.nativeEvent.translationY < -100) {
      setScrollTop(true);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: isScrollTop ? height / 1.2 : slideAnimHeight,
          bottom: isCommentVisible ? 0 : "-10%",
        },
      ]}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={handleGestureEnd}
      >
        <TouchableOpacity style={styles.header}>
          <View style={styles.bar}></View>
        </TouchableOpacity>
      </PanGestureHandler>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Yorumlar */}
        <View style={styles.commentContainer}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/img/profilePhoto1.jpg")}
              style={styles.profilePhoto}
            />
          </TouchableOpacity>
          <View style={styles.commentTextContainer}>
            <TouchableOpacity>
              <Text style={styles.username}>Username</Text>
            </TouchableOpacity>
            <Text style={styles.commentText}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
              praesentium sint, reprehenderit eum aspernatur repellat,
              provident, nisi voluptate incidunt neque cum sapiente maxime dicta
              totam exercitationem pariatur saepe sequi aliquid?
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "gray", marginTop: 10 }}>
                yanıtlar (10)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
    overflow: "hidden",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 30,
    marginTop: -20,
  },
  bar: {
    width: 40,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  commentTextContainer: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
});

export default CommentContainer;
