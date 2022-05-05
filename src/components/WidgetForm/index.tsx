import { useState, useCallback } from "react";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";

import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: "Bug",
    image: {
      source: bugImageUrl,
      alt: "An image of a Bug",
    },
  },
  IDEA: {
    title: "Idea",
    image: {
      source: ideaImageUrl,
      alt: "An image of a Lamp",
    },
  },
  OTHER: {
    title: "Other",
    image: {
      source: thoughtImageUrl,
      alt: "An image of a thought ballon",
    },
  },
};

export type FeedbackTypes = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = useCallback(()=> setFeedbackSent(true),[])

  const restartFeedback = useCallback(() => {
    setFeedbackSent(false)
    setFeedbackType(null)
  }, []);

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent?
      <FeedbackSuccessStep onFeedbackRestartRequested={restartFeedback}/>:
        <>
        {!feedbackType ? (
          <FeedbackTypeStep setFeedbackType={setFeedbackType} />
        ) : (
          <FeedbackContentStep
            feedbackType={feedbackType}
            restartFeedback={restartFeedback}
            onFeedbackSent={handleSendFeedback}
          />
        )}
        </>
      }
      <footer className="text-xs text-neutral-400">
        Made by
        <a
          className="underline underline-offset-2"
          href="https://github.com/arturacm"
        >
          Artur Moreira
        </a>
      </footer>
    </div>
  );
}
