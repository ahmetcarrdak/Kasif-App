import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import Swiper from "react-native-swiper";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { request, PERMISSIONS } from "react-native-permissions"; // Konum izni için
import * as Location from "expo-location";
import mapStyle from "../components/Styles/MapStyle.json";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

interface Address {
  country?: string;
  city?: string;
  county?: string;
  road?: string;
  postcode?: string;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapEvent {
  nativeEvent: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
}

interface setAddress {
  country: string;
  city: string;
  county: string;
  road: string;
  postcode: string;
}

function CreatePostScreen() {
  const navigation = useNavigation();
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Kullanıcının mevcut konumu
  const [address, setAddress] = useState(null);
  const [searchUser, setSearchUser] = useState(String);
  const [searchSchool, setSearchSchool] = useState(String);

  // Special Info Check
  const [isLike, setIsLike] = useState(false);
  const [isLikeCount, setIsLikeCount] = useState(false);
  const [isCommentWrite, setIsCommentWrite] = useState(false);
  const [isComment, setIsComment] = useState(false);

  // Animated values for different containers
  const slideAnim = useState(new Animated.Value(height))[0];
  const descriptionAnim = useState(new Animated.Value(height))[0];
  const schollAnim = useState(new Animated.Value(height))[0];
  const lochalAnim = useState(new Animated.Value(height))[0];
  const partnerShareAnim = useState(new Animated.Value(height))[0];
  const specialInfoAnim = useState(new Animated.Value(height))[0];
  const previewAnim = useState(new Animated.Value(height))[0];

  // Adresses Input
  const [country, setCountry] = useState(String);
  const [city, setCity] = useState(String);
  const [county, setCounty] = useState(String);
  const [road, setRoad] = useState(String);
  const [postcode, setPostcode] = useState(String);

  // Kullanıcı konumunu al
  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Konum İzni Gerekli",
          "Konumunuzu görmek için izin vermelisiniz."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      //@ts-ignore
      setUserLocation(region);
      //@ts-ignore
      setSelectedLocation(region);
    } catch (error) {
      Alert.alert("Hata", "Konum alınamadı. Lütfen tekrar deneyin.");
      console.error(error);
    }
  };

  // Adres bilgilerini al
  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
        {
          headers: {
            "User-Agent": "kasifapp/1.0 (contact@kasifapp.com)",
          },
        }
      );
      const addressData = response.data.address;
      setAddress({
        //@ts-ignore
        country: addressData.country || "Bilinmiyor",
        city: addressData.city || addressData.village || "Bulunamadı",
        county: addressData.county || addressData.town,
        road: addressData.road,
        postcode: addressData.postcode,
      });

      setCountry(addressData.country || null);
      setCity(addressData.city || null);
      setCounty(addressData.county || null);
      setRoad(addressData.road || null);
      setPostcode(addressData.postcode || null);
    } catch (error) {
      Alert.alert("Hata", "Adres alınamadı.");
      console.error(error);
    }
  };

  // Konum seçildiğinde çalışır
  const selectLocationHandler = (event: MapEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const region: Region = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    //@ts-ignore
    setSelectedLocation(region);
    getAddressFromCoordinates(latitude, longitude);
    console.log(latitude, longitude)
  };

  // Kullanıcı konumunu almak için ilk çalıştırma
  useEffect(() => {
    getUserLocation();
  }, []);

  // Keyboard dismiss function
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Pan responder for sliding containers
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy > height / 3) {
        closeAllContainers();
      }
    },
  });

  // Open and Close Functions for Containers
  const openContainer = (animationState: Animated.Value) => {
    Animated.spring(animationState, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeContainer = (animationState: Animated.Value) => {
    Animated.spring(animationState, {
      toValue: height,
      useNativeDriver: true,
    }).start();
  };

  const closeAllContainers = () => {
    closeContainer(slideAnim);
    closeContainer(descriptionAnim);
    closeContainer(schollAnim);
    closeContainer(lochalAnim);
    closeContainer(partnerShareAnim);
    closeContainer(specialInfoAnim);
    closeContainer(previewAnim);
  };

  // Image Picker Functions
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
      openContainer(slideAnim);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
      openContainer(slideAnim);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>İptal</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.shareText}>Paylaş</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        {[
          {
            label: "Resim seç",
            action: openContainer,
            parameter: slideAnim,
          },
          {
            label: "Açıklama ekle",
            action: openContainer,
            parameter: descriptionAnim,
          },
          {
            label: "Kapsamında olduğu okulu seç",
            action: openContainer,
            parameter: schollAnim,
          },
          {
            label: "Buluşma/Etkinlik konumu",
            action: openContainer,
            parameter: lochalAnim,
          },
          {
            label: "Ortak paylaş",
            action: openContainer,
            parameter: partnerShareAnim,
          },
          {
            label: "Diğer ayarlar",
            action: openContainer,
            parameter: specialInfoAnim,
          },
          {
            label: "Ön izleme",
            action: openContainer,
            parameter: previewAnim,
          },
        ].map((item, index) => (
          <LinearGradient
            colors={["#6f3bb3", "#a221c2", "#556fed", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => item.action(item.parameter)}
            >
              <Text style={{ fontSize: 15, color: "#ddd" }}>{item.label}</Text>
              <MaterialIcons name="arrow-forward-ios" size={10} />
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Image Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.screenContainer}>
          {images.length > 0 ? (
            <View style={styles.swiperContainer}>
              <Swiper
                showsButtons={true}
                loop={false}
                nextButton={<Text style={styles.buttonText}>›</Text>}
                prevButton={<Text style={styles.buttonText}>‹</Text>}
              >
                {images.map((imageUri, index) => (
                  <View key={index} style={styles.slide}>
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <MaterialIcons name="close" color="white" size={20} />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.selectedImage}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </Swiper>
            </View>
          ) : (
            <View style={styles.imagePickerButtons}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={openCamera}
              >
                <MaterialIcons name="photo-camera" size={50} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={pickImages}
              >
                <MaterialIcons name="photo-library" size={50} color="gray" />
              </TouchableOpacity>
            </View>
          )}

          {/* Additional Image Options */}
          {images.length > 0 && (
            <View style={styles.additionalImageOptions}>
              <TouchableOpacity
                style={styles.additionalButton}
                onPress={openCamera}
              >
                <MaterialIcons name="photo-camera" size={30} color="gray" />
                <Text>Kamera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.additionalButton}
                onPress={pickImages}
              >
                <MaterialIcons name="photo-library" size={30} color="gray" />
                <Text>Galeri</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Description Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: descriptionAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.screenContainer}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeContainer(descriptionAnim)}>
              <Text style={{ color: "#5190f5", fontSize: 17 }}>Bitti</Text>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback
            onPress={dismissKeyboard}
            style={{ backgroundColor: "#fff" }}
          >
            <View style={[styles.container, { backgroundColor: "white" }]}>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                placeholder="Bir şeyler yaz..."
                placeholderTextColor="#888"
                value={postText}
                onChangeText={setPostText}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>

      {/* School Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: schollAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.screenContainer}>
          <TextInput
            placeholder="Okul adı giriniz.."
            style={styles.searchInput}
            value={searchSchool}
            onChangeText={setSearchSchool}
          />
        </View>
      </Animated.View>

      {/* Location Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: lochalAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.screenContainer}>
          <MapView
            style={styles.map}
            region={selectedLocation || userLocation || undefined}
            onPress={selectLocationHandler}
            customMapStyle={mapStyle}
            showsUserLocation={true}
          >
            {selectedLocation && (
              <Marker
                coordinate={{
                  //@ts-ignore
                  latitude: selectedLocation.latitude,
                  //@ts-ignore
                  longitude: selectedLocation.longitude,
                }}
                //title="Seçilen Konum"
                pinColor="red"
              />
            )}
            {userLocation && !selectedLocation && (
              <Marker
                coordinate={{
                  //@ts-ignore
                  latitude: userLocation.latitude,
                  //@ts-ignore
                  longitude: userLocation.longitude,
                }}
                title="Mevcut Konum"
                pinColor="blue"
              />
            )}
          </MapView>

          {address && (
            <>
              <View style={{ marginTop: 20 }}>
                <TextInput
                  style={styles.AdressInput}
                  placeholder="Ülke bulunamadı lütfen manuel girin"
                  value={country}
                  onChangeText={setCountry}
                />
                <TextInput
                  style={styles.AdressInput}
                  placeholder="İl bulunamadı lütfen manuel girin"
                  value={city}
                  onChangeText={setCity}
                />
                <TextInput
                  style={styles.AdressInput}
                  placeholder="İlçe bulunamadı lütfen manuel girin"
                  value={county}
                  onChangeText={setCounty}
                />
                <TextInput
                  style={styles.AdressInput}
                  placeholder="Mahalle ve cadde bulunamadı lütfen manuel girin"
                  value={road}
                  onChangeText={setRoad}
                />
                <TextInput
                  style={styles.AdressInput}
                  placeholder="Posta kodu bulunamadı lütfen manuel girin"
                  value={postcode}
                  onChangeText={setPostcode}
                />
              </View>
              <TouchableOpacity
                onPress={() => closeContainer(lochalAnim)}
                style={styles.AdressesButton}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Adresi Kaydet
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>

      {/* Share Partner Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: partnerShareAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.screenContainer}>
          <TextInput
            placeholder="Kullanıcı adı giriniz.."
            style={styles.searchInput}
            value={searchUser}
            onChangeText={setSearchUser}
          />
        </View>
      </Animated.View>

      {/* Special Info Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: specialInfoAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.screenContainer, { paddingTop: 40 }]}>
          <View style={styles.checkContainer}>
            <Text>Beğenme sayısını gizle</Text>
            <Switch
              value={isLike}
              onValueChange={setIsLike}
              trackColor={{ false: "#767577", true: "#4CAF50" }}
            />
          </View>
          <View style={styles.checkContainer}>
            <Text>Beğenenleri gizle</Text>
            <Switch
              value={isLikeCount}
              onValueChange={setIsLikeCount}
              trackColor={{ false: "#767577", true: "#4CAF50" }}
            />
          </View>
          <View style={styles.checkContainer}>
            <Text>Yorum yapmayı kapat</Text>
            <Switch
              value={isCommentWrite}
              onValueChange={setIsCommentWrite}
              trackColor={{ false: "#767577", true: "#4CAF50" }}
            />
          </View>
          <View style={styles.checkContainer}>
            <Text>Yorumları gizle</Text>
            <Switch
              value={isComment}
              onValueChange={setIsComment}
              trackColor={{ false: "#767577", true: "#4CAF50" }}
            />
          </View>
        </View>
      </Animated.View>

      {/* Preview Container */}
      <Animated.View
        style={[
          styles.ouxContainer,
          { transform: [{ translateY: previewAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.screenContainer}>
          <Text>önizleme</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  cancelText: { color: "red", fontSize: 16 },
  shareText: { color: "rgb(81, 144, 245)", fontSize: 16 },
  gradientBorder: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    padding: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2b2b2b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "##2b2b2b",
    borderRadius: 20,
  },
  ouxContainer: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  screenContainer: {
    position: "absolute",
    width: "100%",
    height: "90%",
    backgroundColor: "#fff",
    bottom: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 5,
  },
  swiperContainer: { width: "100%", height: "80%" },
  buttonText: { color: "gray", fontSize: 45, fontWeight: "bold" },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePickerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  galleryButton: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  additionalImageOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  additionalButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textArea: {
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 15,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },

  map: {
    flex: 1,
    width: "100%",
    borderRadius: 60,
  },
  AdressInput: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  AdressesButton: {
    backgroundColor: "#51f5be",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default CreatePostScreen;
