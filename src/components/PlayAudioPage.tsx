// PlayAudioPage.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const PlayAudioPage: React.FC = () => {
  const location = useLocation();
  const voiceId = new URLSearchParams(location.search).get('voiceId');
  console.log('voiceId: ', voiceId);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const data = await getTtsById(voiceId);
        console.log(data.data);
        if (data.data.audioUrl) {
            const audio = new Audio(data.data.audioUrl);
            audio.play();
          }
      } catch (error) {
        console.error("Error fetching voices:", error);
      }
    };
}
)

  return (
    <div>
      <h1>재생 중...</h1>
    </div>
  );
};

export default PlayAudioPage;
