import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  onTimeChange: (time: number, offsetTime: number) => void;
  onMaxTimeChange: (maxTime: number) => void;
  onProgressChange: (progress: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onTimeChange,
  onMaxTimeChange,
  onProgressChange,
}) => {
  const player = useRef<HTMLVideoElement>(null);
  const interval = useRef<any>(null);

  const handlePlay = (): void => {
    interval.current = setInterval(() => {
      const newTime = (player.current?.currentTime || 0) * 1000;
      onTimeChange(newTime, 0);
    }, 1000);
  };

  const handlePause = (): void => {
    clearInterval(interval.current);
  };

  const handleDataLoaded = (): void => {
    const maxTime = (player.current?.duration || 0) * 1000;
    onMaxTimeChange(maxTime);
  };

  const handleProgress = (): void => {
    const buffer: any = player?.current?.buffered;

    if (((buffer?.length > 0 && player.current?.duration) || 0) > 0) {
      let currentBuffer = 0;
      const inSeconds = player.current?.currentTime || 0;

      for (let i = 0; i < buffer.length; i++) {
        if (buffer.start(i) <= inSeconds && inSeconds <= buffer.end(i)) {
          currentBuffer = i;
          break;
        }
      }

      const progress = buffer.end(currentBuffer) * 1000 || 0;
      onProgressChange(progress);
    }
  };

  useEffect(() => {
    if (!player.current) {
      return;
    }

    player.current.addEventListener('play', handlePlay);
    player.current.addEventListener('pause', handlePause);
    player.current.addEventListener('loadeddata', handleDataLoaded);
    player.current.addEventListener('progress', handleProgress);

    return () => {
      if (player.current) {
        player.current.removeEventListener('play', handlePlay);
        player.current.removeEventListener('pause', handlePause);
        player.current.removeEventListener('loadeddata', handleDataLoaded);
        player.current.removeEventListener('progress', handleProgress);
      }
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="video-container">
      <video
        controls
        autoPlay
        className="demo-video"
        ref={player}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}; 