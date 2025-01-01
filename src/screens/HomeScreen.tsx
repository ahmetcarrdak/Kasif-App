import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

// Aux
import HomeHeader from "../components/HomeHeader";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import ShareContainer from "../components/ShareContainer";
import CommentContainer from "../components/CommentContainer";

// API
import { ShareProvider } from "../API/ShareProvider";
import { CommentProvider } from "../API/CommentProvider";

const HomeScreen = () => {
  return (
    <CommentProvider>
      <ShareProvider>
        <View style={[styles.container]}>
          <HomeHeader />
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Stories />
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
              <Posts />
            </View>
          </ScrollView>
          <ShareContainer />
          <CommentContainer />
        </View>
      </ShareProvider>
    </CommentProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
