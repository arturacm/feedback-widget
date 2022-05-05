import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { Loading } from "../Loading";
import { useState } from "react";

interface ScreenshotButtonProps {
    onScreenshotTook: (screenshot: string | null) => void;
    screenshot: string | null;
}

export function ScreenshotButton({onScreenshotTook, screenshot}: ScreenshotButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleTakeScreenshot = async () => {
      setIsLoading(true)
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onScreenshotTook(base64image);
    setIsLoading(false);
  };
  if(screenshot){
      return (
        <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
            backgroundImage: `url(${screenshot})`,
            backgroundPosition: 'right bottom',
            backgroundSize: 180,
        }}
        >
            <Trash weight="fill" onClick={()=> onScreenshotTook(null)} />
        </button>)
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900"
    >
      {isLoading ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
