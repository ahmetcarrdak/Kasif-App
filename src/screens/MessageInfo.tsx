import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useState, useRef } from "react";

function MessageInfo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params as { userId: number };
  const [isQuiet, setQuiet] = useState(false);
  const themeBottomValue = useRef(new Animated.Value(-1000)).current;

  const themeViewOpen = () => {
    Animated.timing(themeBottomValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const themeViewClose = () => {
    Animated.timing(themeBottomValue, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleQuitToggle = () => {
    setQuiet(!isQuiet);
  };

  const Header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={"white"}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
    );
  };

  const UserInfo = () => (
    <View style={styles.userInfo}>
      <Image
        source={{
          uri: `https://randomuser.me/api/portraits/men/${userId}.jpg`,
        }}
        style={styles.userImage}
      />
      <Text style={styles.userName}>User Name</Text>
    </View>
  );

  const UserSettings = () => {
    return (
      <View style={styles.userSettings}>
        <TouchableOpacity
          style={styles.settingButton}
          //@ts-ignore
          onPress={() => navigation.navigate("UserProfile", { userId })}
        >
          <AntDesign name="user" size={25} color={"white"} />
          <Text style={styles.userSettingsText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <EvilIcons name="search" size={30} color={"white"} />
          <Text style={styles.userSettingsText}>Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={handleQuitToggle}
        >
          <Ionicons
            name={isQuiet ? "notifications" : "notifications-off"}
            size={25}
            color={"white"}
          />
          <Text style={styles.userSettingsText}>
            {isQuiet ? "Sessize al" : "Sesi aç"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Entypo name="dots-three-horizontal" size={25} color={"white"} />
          <Text style={styles.userSettingsText}>Seçenekler</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const MessageSettings = () => (
    <View style={styles.messageSettings}>
      <TouchableOpacity
        style={styles.messageSettingButton}
        activeOpacity={1}
        onPress={themeViewOpen}
      >
        <Image
          source={require("../../assets/img/backgroundVertical.jpg")}
          style={{ width: 45, height: 45, borderRadius: 22.5 }}
        ></Image>
        <Text style={styles.messageSettingsText}>Tema</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.messageSettingButton}>
        <Text style={styles.messageSettingsText}>Sohbet kontrolleri</Text>
        <MaterialIcons name="keyboard-arrow-right" size={20} color={"white"} />
      </TouchableOpacity>
    </View>
  );

  const images = [
    require("../../assets/theme/tema1.jpg"),
    require("../../assets/theme/tema2.jpg"),
    require("../../assets/theme/tema3.jpeg"),
    require("../../assets/theme/tema5.jpg"),
    require("../../assets/theme/tema7.jpg"),
    require("../../assets/theme/tema8.jpg"),
    require("../../assets/theme/tema10.jpg"),
    require("../../assets/theme/tema11.jpg"),
    require("../../assets/theme/tema12.jpg"),
    require("../../assets/theme/tema13.jpg"),
    require("../../assets/theme/tema14.jpg"),
    require("../../assets/theme/tema15.jpg"),
    require("../../assets/theme/tema16.jpg"),
    require("../../assets/theme/tema17.jpg"),
  ];

  const ThemeViewContainer = () => (
    <Animated.View
      style={[
        styles.themeView,
        {
          bottom: themeBottomValue,
        },
      ]}
    >
      <ScrollView style={styles.themeViewInline}>
        <View style={styles.themeImageContainer}>
          {images.map((image, index) => (
            <TouchableOpacity key={index}>
              <Image
                source={image}
                style={{
                  width: 90,
                  height: 130,
                  borderRadius: 15,
                  marginLeft: 10,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.themeViewInlineButton}
        onPress={themeViewClose}
      >
        <Text style={styles.themeViewInlineButtonText}>İptal</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <UserInfo />
        <UserSettings />
        <MessageSettings />
      </ScrollView>
      <ThemeViewContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    width: "100%",
    marginTop: 70,
    paddingHorizontal: 10,
  },
  userInfo: {
    marginTop: 30,
  },
  userImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  userSettings: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  settingButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  userSettingsText: {
    color: "white",
    fontSize: 15,
    marginTop: 13,
  },
  messageSettings: {
    marginTop: 30,
  },
  messageSettingButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#333",
    backgroundColor: "black",
    padding: 15,
  },
  messageSettingsText: {
    color: "white",
    fontSize: 15,
  },
  themeView: {
    position: "absolute",
    height: 600,
    width: "100%",
    marginBottom: 10,
    borderRadius: 20,
  },
  themeViewInline: {
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  themeImageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    overflow: "hidden",
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 30,
  },
  themeViewInlineButton: {
    padding: 10,
    width: "90%",
    alignSelf: "center",
  },
  themeViewInlineButtonText: {
    fontSize: 20,
    color: "#bab4a4",
    textAlign: "center",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MessageInfo;
