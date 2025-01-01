import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";

function ReportScreen() {
  const [gradientPoints, setGradientPoints] = useState({
    start: { x: Math.random(), y: Math.random() },
    end: { x: Math.random(), y: Math.random() },
  });

  const randomizeGradient = () => {
    setGradientPoints({
      start: { x: Math.random(), y: Math.random() },
      end: { x: Math.random(), y: Math.random() },
    });
  };

  const renderRightActions = (id: number) => (
    <TouchableOpacity
      style={styles.rightAction}
      onPress={() => handleDeleteReport(id)}
    >
      <Text style={styles.actionText}>Sil</Text>
    </TouchableOpacity>
  );

  const handleDeleteReport = (id: number) => {
    // Silme işlemi yapılacak
    console.log("Silindi", id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bildirimler</Text>
      </View>
      <ScrollView>
        <Swipeable
          friction={2}
          overshootRight={false}
          renderRightActions={() => renderRightActions(1)}
        >
          <View>
            <LinearGradient
              colors={["#a221c2", "#3c5ab4"]}
              start={gradientPoints.start}
              end={gradientPoints.end}
              style={styles.gradientBorder} // LinearGradient için stiller
            >
              <View style={styles.reportItem}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/img/pp3.webp")}
                    style={styles.profilePhoto}
                  ></Image>
                </TouchableOpacity>
                <View style={styles.reportItemContent}>
                  <TouchableOpacity>
                    <Text style={styles.reportItemName}>User Name</Text>
                  </TouchableOpacity>
                  <Text style={styles.reportItemMessage}>
                    @jhondoe semi takip etmeye başladı
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/img/st4.jpg")}
                    style={styles.postPhoto}
                  ></Image>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Swipeable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  gradientBorder: {
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 12.5,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  reportItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  reportItemContent: {
    width: "45%",
  },
  reportItemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  reportItemMessage: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    flexWrap: "wrap",
  },
  postPhoto: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  rightAction: {
    width: 80,
    borderRadius: 12.5,
    backgroundColor: "#9c42a8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  actionText: {
    color: "white",
    fontSize: 16,
  },
});

export default ReportScreen;
