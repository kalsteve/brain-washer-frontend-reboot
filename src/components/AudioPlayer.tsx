import React, { useEffect, useRef } from "react";

interface AudioPlayerProps {
  audioData: Uint8Array[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioData }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const queueRef = useRef<Uint8Array[]>([]);
  const mediaSourceOpened = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      mediaSourceRef.current = new MediaSource();
      audioRef.current.src = URL.createObjectURL(mediaSourceRef.current);

      mediaSourceRef.current.addEventListener("sourceopen", () => {
        mediaSourceOpened.current = true;
        sourceBufferRef.current =
          mediaSourceRef.current!.addSourceBuffer("audio/mpeg");
        sourceBufferRef.current!.addEventListener("updateend", appendToBuffer);
        appendToBuffer(); // Try to append the buffer when the source is opened
      });
    }

    return () => {
      if (mediaSourceRef.current) {
        mediaSourceRef.current.removeEventListener(
          "sourceopen",
          appendToBuffer,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (mediaSourceOpened.current) {
      queueRef.current.push(...audioData);
      appendToBuffer();
    }
  }, [audioData]);

  const appendToBuffer = () => {
    if (
      sourceBufferRef.current &&
      !sourceBufferRef.current.updating &&
      queueRef.current.length > 0
    ) {
      const chunk = queueRef.current.shift()!;
      try {
        sourceBufferRef.current.appendBuffer(chunk);
      } catch (error) {
        console.error("Failed to append buffer:", error);
      }

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error("Failed to start audio playback:", error.message);
        });
      }
    }
  };

  return <audio ref={audioRef} controls hidden />;
};

export default AudioPlayer;
