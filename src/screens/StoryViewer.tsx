import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { height } = Dimensions.get("window");

// @ts-ignore
function StoryViewer({ route, navigation }) {
  const { userId, STORIES_DATA } = route.params; // Tüm hikayeler ve kullanıcının ID'si alınıyor
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tüm hikayeleri düz bir listeye çeviriyoruz
  const flattenedStories = STORIES_DATA.flatMap((user) =>
    user.stories.map((story) => ({
      ...story,
      username: user.username,
      profileImage: user.profileImage,
      userId: user.id, // Kullanıcı ID'si
    }))
  );

  // Gelen kullanıcıdan başlaması için başlangıç ayarı
  useEffect(() => {
    const startIndex = flattenedStories.findIndex(
      (story) => story.userId === userId // Doğru kullanıcının hikayesini bul
    );
    setCurrentIndex(startIndex !== -1 ? startIndex : 0);
  }, [userId, flattenedStories]);

  const handleSwipe = (direction: string) => {
    if (direction === "up" && currentIndex < flattenedStories.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "down" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const renderStory = ({ item }) => {
    return (
      <View style={styles.storyContainer}>
        <Image source={item.image} style={styles.storyImage} />
        <View style={styles.storyHeader}>
          <Image source={item.profileImage} style={styles.profilePhoto} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flattenedStories}
        renderItem={renderStory}
        keyExtractor={(item) => `${item.userId}-${item.id}`}
        horizontal={false}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        initialScrollIndex={currentIndex} // Başlangıç noktası
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })} // Performansı artırır
        onScrollToIndexFailed={() => {}} // Hata durumunda sessizce devam eder
        onMomentumScrollEnd={(e) => {
          const contentOffsetY = e.nativeEvent.contentOffset.y;
          const currentIndex = Math.round(contentOffsetY / height);
          setCurrentIndex(currentIndex);
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  storyContainer: {
    height: height, // Tam ekran hikaye gösterimi
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  storyHeader: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 25,
  },
});

export default StoryViewer;
