import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import MapViewClustering from "react-native-map-clustering";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Location from "expo-location";
import openMap from "react-native-open-maps";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

interface Location {
  id: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  username: string;
  image: string;
}

const MapScreen = () => {
  // Referanslar
  const mapRef = useRef<MapView | null>(null);
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  // State'ler
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Örnek lokasyon verileri - gerçek verilerinizle değiştirin
  const locations: Location[] = [
    {
      id: 1,
      coordinate: {
        latitude: 41.0082,
        longitude: 28.9784,
      },
      title: "İstanbul Lokasyon 1",
      username: "jhondoe",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      coordinate: {
        latitude: 41.0182,
        longitude: 28.9684,
      },
      title: "İstanbul Lokasyon 2",
      username: "jhondoe",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      coordinate: {
        latitude: 41.2797603168738,
        longitude: 31.423229783407052,
      },
      title: "İstanbul Lokasyon 3",
      username: "jhondoe",
      image: "https://via.placeholder.com/150",
    },
    // Daha fazla lokasyon ekleyebilirsiniz
  ];

  // Kullanıcı konumunu almak için ilk çalıştırma
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Konum izni verilmedi");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const newRegion: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);

      // İsterseniz haritayı kullanıcı konumuna animasyonlu şekilde taşıyabilirsiniz
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error("Konum alınırken bir hata oluştu: ", error);
    }
  };

  // Marker'a tıklandığında detay kartını göster
  const onMarkerPress = (location: Location) => {
    setSelectedMarker(location);

    // Haritayı marker konumuna odakla
    mapRef.current?.animateToRegion(
      {
        ...location.coordinate,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      350
    );
  };

  const openInMaps = (latitude: number, longitude: number, title: string) => {
    openMap({
      latitude: latitude,
      longitude: longitude,
      query: title,
    });
  };

  // Detay kartını kapat
  const closeDetail = () => {
    setSelectedMarker(null);
  };

  // Özel marker stili
  const renderMarker = (location: Location) => (
    <Marker
      key={location.id}
      coordinate={location.coordinate}
      onPress={() => onMarkerPress(location)}
    >
      <FontAwesome5 name="map-pin" size={20} color={"#b300ff"} />
    </Marker>
  );

  // Detay kartı bileşeni
  const renderDetailCard = () => {
    if (!selectedMarker) return null;

    return (
      <Animated.View
        style={[
          styles.detailCard,
          {
            transform: [
              {
                translateY: scrollAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [CARD_HEIGHT, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={closeDetail}>
          <MaterialIcons name="close" size={24} color="#000" />
        </TouchableOpacity>

        <Image
          source={{ uri: selectedMarker.image }}
          style={styles.cardImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{selectedMarker.title}</Text>
          <TouchableOpacity style={styles.cardUsername}>
            <Text style={{ color: "white" }}>@{selectedMarker.username}</Text>
            <AntDesign name="arrowright" size={15} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() =>
              openInMaps(
                selectedMarker.coordinate.latitude,
                selectedMarker.coordinate.longitude,
                selectedMarker.title
              )
            }
          >
            <Text style={styles.buttonText}>Haritada aç</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  // Marker seçildiğinde animasyon
  useEffect(() => {
    if (selectedMarker) {
      Animated.spring(scrollAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    } else {
      Animated.spring(scrollAnimation, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
      }).start();
    }
  }, [selectedMarker]);

  return (
    <View style={styles.container}>
      <MapViewClustering
        ref={mapRef}
        style={styles.map}
        initialRegion={
          region ?? {
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        region={selectedLocation || region || undefined}
        onRegionChangeComplete={setRegion}
        spiralEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        maxZoom={20}
        minPoints={4}
        extent={512}
        nodeSize={64}
      >
        {locations.map(renderMarker)}
      </MapViewClustering>

      {renderDetailCard()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  detailCard: {
    position: "absolute",
    bottom: 20,
    left: width * 0.1,
    width: "80%",
    height: 100,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    borderRadius: 20,
  },
  closeButton: {
    position: "absolute",
    left: 5,
    top: 5,
    zIndex: 1,
    padding: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardUsername: {
    padding: 3,
    backgroundColor: "#c7c7c7",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    marginBottom: 6,
  },
  cardButton: {
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MapScreen;
