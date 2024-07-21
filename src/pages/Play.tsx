import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {getTtsById} from "../api/voices.ts";


const Play: React.FC = () => {
    const location = useLocation();
    const [voice, setVoice] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const queryParams = new URLSearchParams(location.search);
    const voiceId = parseInt(queryParams.get('v') || '', 10);

    useEffect(() => {
        const fetchVoice = async () => {
            try {
                const data = await getTtsById(voiceId);
                setVoice(data.data.audio_url); // 응답 데이터의 data 배열 설정
                console.log("audio_url: ", data.data.audio_url);
                console.log("voice: ", voice)
            } catch (error) {
                console.error("Error fetching voices:", error);
            }
        };

        fetchVoice();
    }, [voiceId]);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    return (
        
        <div
      className="relative w-full h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ backgroundImage: "url('https://i.ibb.co/s3QC5vr/3.jpg')" }}
    >
            {voice ? (
                <div>     
                    {!isPlaying ? (
                        <button onClick={handlePlayClick} className="bg-gradient-to-r from-violet-900 to-pink-950 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200 ease-in-out">재생</button>
                    ) : (
                        <audio controls autoPlay>
                            <source src={voice} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            ) : (
                <p>음성 파일을 불러오는 중...</p>
            )}
        </div>
    );
};

export default Play;