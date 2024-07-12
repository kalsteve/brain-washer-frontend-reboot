import { useEffect, useRef } from "react";
interface AudioPlayerProps {
  audioStreamUrl?: string;
  content: string;
}
const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioStreamUrl,
  content,
}: AudioPlayerProps) => {
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (!audioStreamUrl) {
      console.error("Audio stream URL is not defined");
      return;
    }

    const fetchAudio = async () => {
      const jsonData = {
        bubble_id: 0,
        content: { content },
      };
      try {
        const response = await fetch(audioStreamUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
        console.log("response", response);

        const reader = response.body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            const push = async () => {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            };
            push();
          },
        });

        const audioContext = new (window.AudioContext || window.AudioContext)();
        const source = audioContext.createBufferSource();
        const audioBuffer = await new Response(stream).arrayBuffer();
        const decodedAudio = await audioContext.decodeAudioData(audioBuffer);
        source.buffer = decodedAudio;
        source.connect(audioContext.destination);
        source.start(0);

        audioContextRef.current = audioContext;
        sourceRef.current = source;
      } catch (error) {
        console.error("Error fetching audio stream:", error);
      }
    };

    fetchAudio();

    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioStreamUrl]);

  return <div></div>;
};

export default AudioPlayer;
