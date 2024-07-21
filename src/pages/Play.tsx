import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTtsById } from "../api/voices.ts";

const Play: React.FC = () => {
    const location = useLocation();
    const [voice, setVoice] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [characterImage, setCharacterImage] = useState<string | null>(null); // character_image 추가
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const queryParams = new URLSearchParams(location.search);
    const voiceId = parseInt(queryParams.get('v') || '', 10);

    useEffect(() => {
        const fetchVoice = async () => {
            try {
                const data = await getTtsById(voiceId);
                setVoice(data.data.audio_url); // 응답 데이터의 audio_url 설정
                setContent(data.data.content); // 응답 데이터의 content 설정
                setCharacterImage(data.data.character_image); // 응답 데이터의 character_image 설정
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
            className="relative w-full h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-6"
            style={{ backgroundImage: "url('https://i.ibb.co/s3QC5vr/3.jpg')" }}
        >
            <div className="text-center mb-6">
                {characterImage ? (
                    <img
                        src={characterImage}
                        alt="Character"
                        className="w-48 h-48 object-cover rounded-full shadow-lg mb-4 mx-auto"
                    />
                ) : (
                    <p className="text-white mb-4">캐릭터 이미지가 없습니다.</p>
                )}
                {content && <p className="text-lg text-white max-w-[70rem] mx-auto mt-10 mb-5 ">{content}</p>}
            </div>
            <div>
                {voice ? (
                    <div>
                        {!isPlaying ? (
                            <button
                                onClick={handlePlayClick}
                                className="bg-gradient-to-r from-violet-900 to-pink-950 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200 ease-in-out"
                            >
                                PLAY
                            </button>
                        ) : (
                            <audio controls autoPlay>
                                <source src={voice} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>
                ) : (
                    <p className="text-white">음성 파일을 불러오는 중...</p>
                )}
            </div>
        </div>
    );
};

export default Play;
