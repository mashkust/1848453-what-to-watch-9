import { useEffect, useRef, useState } from 'react';

type PlayerProps = {
  src: string;
  posterImage: string;
  isActive: boolean;
  isPreview: boolean;
}

function VideoPlayer({src, posterImage, isActive, isPreview}: PlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.onloadeddata = () => setIsLoading(false);
    }
  }, [src, videoRef]);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isActive) {
      videoRef.current.muted = isPreview;
      videoRef.current.play();
    }

    if (!isActive) {
      videoRef.current.load();
    }

  }, [isActive, isPreview]);

  return (<video className="player__video" src={src} poster={isLoading ?'Загрузка...':posterImage} ref={videoRef} />);
}

export default VideoPlayer;
