import { View, Text } from "react-native";
import React from "react";

import { styles } from "./styles";

export const Copyright = () => {
  return (
    <View >
      <Text style={styles.text}> App made by Artur Moreira </Text>
    </View>
  );
};
