import type { FeedbackTypes } from "..";
import { feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ArrowLeft, Camera } from "phosphor-react";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState, useCallback, ChangeEvent } from "react";

interface FeedbackContentStepProps {
  feedbackType: FeedbackTypes;
  restartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  restartFeedback,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const typeInfo = feedbackTypes[feedbackType];

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    onFeedbackSent()
    console.log({
      screenshot,
      comment,
    });
  },[]);

  const handleCommentChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>)=> setComment(event.target.value),[]);

  return (
    <>
      <header>
        <span className="text-xl leading-6 flex items-center gap-2 ">
          <button
            className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
            onClick={restartFeedback}
          >
            <ArrowLeft className="w-4 h-4" weight="bold" />
          </button>
          <img
            src={typeInfo.image.source}
            alt={typeInfo.image.alt}
            className="w-6 h-6"
          />
          {typeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmit}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-sm focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Tell us in details what is happening"
          onChange={handleCommentChange}
        />

      <footer className="flex gap-2 mt-2">
        <ScreenshotButton
          onScreenshotTook={setScreenshot}
          screenshot={screenshot}
        />

        <button
          type="submit"
          className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sn hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors disabled:opacity-50 Odisabled:hover:bg-brand-500"
          disabled={comment?.length ===0}
        >
          Send feedback
        </button>
      </footer>
      </form>
    </>
  );
}
