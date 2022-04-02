import {useNavigate, useParams} from 'react-router-dom';
import type {Film} from '../types/types';
import {Oval} from 'react-loader-spinner';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import { useEffect, useRef, useState } from 'react';
import { fetchFilmAction } from '../store/api-actions';
import LoadingScreen from './loading-screen';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

function Player(): JSX.Element {
  dayjs.extend(duration);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filmid = Number(params.id);
  const isDataLoaded= useAppSelector(({DATA}) => DATA.isDataLoaded);
  const film= useAppSelector(({DATA}) => DATA.film);
  const { videoLink, backgroundImage, name } = film as Film;

  useEffect(() => {
    dispatch(fetchFilmAction(filmid));
  }, [dispatch, filmid]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [termination, setTermination] = useState(videoRef.current?.duration);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  const fullScreenClickHandler = () => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.requestFullscreen();
  };

  const timeUpdateHandler = () => {
    if (!videoRef.current) {
      return;
    }
    setVideoDuration(videoRef.current.duration);
    setSeconds(videoRef.current.currentTime);
    setTermination(Math.floor(videoDuration - seconds));
    setVideoProgress((seconds / videoDuration) * 100);
  };

  const formatTermination = (time: number) => {
    const leftDuration = dayjs.duration(time, 'seconds');
    if(leftDuration.asHours() >= 1) {
      return leftDuration.format('-HH:mm:ss');
    }
    return leftDuration.format('mm:ss');
  };

  if (!film || !isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="player">
      <video src ={videoLink} ref ={videoRef} className="player__video" poster ={backgroundImage} onTimeUpdate ={timeUpdateHandler} onCanPlay ={() => setLoaded(true)}>
      </video> {isLoaded? null :
        <div style = {{
          position: 'fixed',
          top: '100px',
          left: '200px',
          zIndex: 50,
        }}
        >  <Oval color='green'/>
        </div>}
      <button type="button" className="player__exit" onClick ={() => navigate(`/films/${filmid}`)}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={videoProgress ? videoProgress : '0'} max="100"></progress>
            <div className="player__toggler" style={{left: `${videoProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{termination ? formatTermination(termination) : null}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" disabled = {!isDataLoaded} onClick = {() => {setIsPlaying(!isPlaying);}}>
            <svg viewBox = {isPlaying ? '0 0 14 21' : '0 0 19 19'} width = {isPlaying ? '14' : '19'} height = {isPlaying ? '21' : '19'}>
              <use xlinkHref = {isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen" onClick ={fullScreenClickHandler} >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
