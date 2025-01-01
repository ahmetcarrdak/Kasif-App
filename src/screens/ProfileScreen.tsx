import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const ProfileStats = ({
  followers,
  following,
}: {
  followers: string;
  following: string;
}) => (
  <View style={styles.statusView}>
    <StatBlock count={followers} label="followers" />
    <View style={styles.profilePhotoContainer}>
      <Image
        source={require("../../assets/img/profilePhoto1.jpg")}
        style={styles.profilePhoto}
      />
      <Text style={styles.displayName}>Jhon Doe</Text>
      <Text style={styles.handle}>@jhondoe</Text>
    </View>
    <StatBlock count={following} label="following" />
  </View>
);

const StatBlock = ({ count, label }: { count: string; label: string }) => (
  <TouchableOpacity style={styles.statBlock}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

const ActionButtons = () => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Ayarlar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Profili paylaş</Text>
    </TouchableOpacity>
  </View>
);

const IconMenu = ({
  selectedIcon,
  onIconPress,
}: {
  selectedIcon: number;
  onIconPress: (iconName: number) => void;
}) => (
  <View style={styles.iconContainer}>
    <IconItem
      name="circle-info"
      isSelected={selectedIcon === 1}
      onPress={() => onIconPress(1)}
    />
    <IconItem
      name="table-cells-large"
      isSelected={selectedIcon === 2}
      onPress={() => onIconPress(2)}
    />
    <IconItem
      name="user-group"
      isSelected={selectedIcon === 3}
      onPress={() => onIconPress(3)}
    />
  </View>
);

const IconItem = ({
  name,
  isSelected,
  onPress,
}: {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.iconItem} onPress={onPress}>
    <FontAwesome6 name={name} color={"white"} size={20} />
    {isSelected && <View style={styles.iconDot} />}
  </TouchableOpacity>
);

const ProfileContent = ({ selectedIcon }: { selectedIcon: number }) => {
  return (
    <View style={styles.contentContainer}>
      {selectedIcon === 1 && (
        <View>
          <Text style={styles.infoTitle}>School</Text>
          <TouchableOpacity>
            <Text style={styles.infoText}>İstanbul Teknik Üniversitesi</Text>
          </TouchableOpacity>

          <Text style={styles.infoTitle}>Bio</Text>
          <Text style={styles.infoText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit
            nostrum deleniti error facilis sint maxime inventore, iste, dolore
            dolor doloremque adipisci eveniet molestias impedit eum ducimus
            assumenda fugiat eos.
          </Text>

          <Text style={styles.infoTitle}>Links</Text>
          <TouchableOpacity>
            <Text style={styles.infoLink}>https://www.example.com</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.infoLink}>https://www.example.com</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.infoLink}>https://www.example.com</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedIcon === 2 && (
        <View style={styles.posts}>
          {[
            require("../../assets/img/st2.avif"),
            require("../../assets/img/st3.jpg"),
            require("../../assets/img/st4.jpg"),
            require("../../assets/img/stroies1.jpeg"),
            require("../../assets/img/profilePhoto1.jpg"),
          ].map((imageSource, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log(`Image ${index + 1} clicked`)}
              style={styles.post}
            >
              <Image source={imageSource} style={styles.postImage} />
            </TouchableOpacity>
          ))}
        </View>
      )}
      {selectedIcon === 3 && (
        <View style={styles.posts}>
          {[
            require("../../assets/img/st2.avif"),
            require("../../assets/img/st3.jpg"),
            require("../../assets/img/st4.jpg"),
            require("../../assets/img/stroies1.jpeg"),
            require("../../assets/img/profilePhoto1.jpg"),
          ].map((imageSource, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log(`Image ${index + 1} clicked`)}
              style={styles.post}
            >
              <Image source={imageSource} style={styles.postImage} />
              <Text style={styles.shareText}>@allinamey</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ProfileScreen = () => {
  const [selectedIcon, setSelectedIcon] = useState<number>(1);

  const handleIconPress = (iconName: number) => {
    setSelectedIcon(iconName);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../../assets/img/bannerImage.jpg")}
          style={styles.bannerImage}
        />
        <ProfileStats followers="300K" following="300K" />
        <ActionButtons />
        <IconMenu selectedIcon={selectedIcon} onIconPress={handleIconPress} />
        <ProfileContent selectedIcon={selectedIcon} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -40,
    marginBottom: 30,
  },
  profilePhotoContainer: {
    alignItems: "center",
  },
  profilePhoto: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  displayName: {
    color: "white",
    fontSize: 23,
    marginTop: 10,
  },
  handle: {
    color: "white",
    fontSize: 18,
    marginTop: 7,
  },
  statBlock: {
    alignItems: "center",
  },
  statCount: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#0d5f7a",
    width: "45%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  iconItem: {
    alignItems: "center",
  },
  iconDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 5,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contentText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  posts: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  post: {
    width: "30%",
    height: 150,
    marginBottom: 15,
    marginHorizontal: 4,
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  shareText: {
    position: "absolute",
    top: 5,
    left: 5,
    color: "white",
    fontSize: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 10,
  },
  infoTitle: {
    color: "#4f4f4f",
    fontSize: 13,
    marginTop: 15,
  },
  infoText: {
    color: "#d9d9d9",
    fontSize: 15,
    marginTop: 5,
  },
  infoLink: {
    color: "#0d5f7a",
    fontSize: 15,
    marginTop: 5,
  },
});

export default ProfileScreen;
