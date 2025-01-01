import { View, TouchableOpacity, Image, Text } from "react-native";
import React, { useState, useRef } from "react";

//@ts-ignore
function StoryViewerPage({ route }) {
  const { userId, STORIES_DATA } = route.params;
  return (
    <View>
      <Text>StoryViewerPage</Text>
    </View>
  );
}

export default StoryViewerPage;
