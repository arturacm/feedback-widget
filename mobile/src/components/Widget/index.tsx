import React, { useRef } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { styles } from "./styles";
import { theme } from "../../theme";
import { feedbackTypes } from '../../utils/feedbackTypes';
export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };
  return (
    <>
      <TouchableOpacity onPress={handleOpen} style={styles.button}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Text>To be completed herer</Text>
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
