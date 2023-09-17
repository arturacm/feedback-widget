import React, { useState, useCallback } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { styles } from "./styles";
import { theme } from "../../theme";
import { captureScreen } from "react-native-view-shot";
import { FeedbackType } from "../Widget";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { api } from "../../libs/api";

import * as FileSystem from "expo-file-system";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleScreenshot = useCallback(() => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }, []);

  const removeScreenshot = useCallback(() => {
    setScreenshot(null);
  }, []);

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }
    try {
      const screenshotBase64 =
        screenshot &&
        FileSystem.readAsStringAsync(screenshot, { encoding: "base64" });

      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot: screenshotBase64,
        comment,
      });
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
    onFeedbackSent();
    setIsSendingFeedback(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <BottomSheetTextInput
        multiline
        style={styles.input}
        placeholder="Is something not working? We would like to solve it. Please tell us in details what"
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={removeScreenshot}
          screenshot={screenshot}
        />
        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
