import React, { useRef, useState, useCallback } from "react";
import { TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { styles } from "./styles";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Options } from "../Options";
import { Form } from "../Form";
import { Success } from "../Success";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleOpen = () => bottomSheetRef.current?.expand();
  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };
  const handleFeedbackSent = useCallback(() => setFeedbackSent(true), []);
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
          {feedbackSent ? (
            <Success onSendAnotherFeedback={handleRestartFeedback} />
          ) : (
            <>
              {feedbackType ? (
                <Form
                  feedbackType={feedbackType}
                  onFeedbackCanceled={handleRestartFeedback}
                  onFeedbackSent={handleFeedbackSent}
                />
              ) : (
                <Options onFeedbackTypeChanged={setFeedbackType} />
              )}
            </>
          )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
