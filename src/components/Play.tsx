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
        <div>
            {voice ? (
                <div>
                    {!isPlaying ? (
                        <button onClick={handlePlayClick}>재생</button>
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