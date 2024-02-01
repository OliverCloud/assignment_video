'use client'
import { useRef, useEffect } from 'react';
import styles from './ourVideoPlayer.module.css';
const OurVideoPlayer = ({path}) => {

    const videoRef = useRef(null);

    console.log(videoRef);

    const playVideo = () => {
        videoRef.current.play();
    };

    const pauseVideo = () => {
        videoRef.current.pause();
    };

    const changeVolume = (e) => {
        videoRef.current.volume = e.target.value
    };
    
    const muteToggle = () => {
        videoRef.current.muted = !videoRef.current.muted;
    }

    const fastForward = () => {
        videoRef.current.currentTime += 10;
    }

    const rewind = () => {
        videoRef.current.currentTime -= 10;
    }

    const fullScreen = () => {
        videoRef.current.requestFullscreen();
    }

    useEffect(() => {
        const changeTime = (e) => {
            videoRef.current.currentTime = e.target.value;
        }
        const inputElement = document.querySelector('input[type="range"]');
        inputElement.addEventListener('input', changeTime);
        return () => {
            inputElement.removeEventListener('input', changeTime);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.ourVideo}>
                    <video src={path} ref={videoRef} controls muted></video>
            </div>
         
            <div className={styles.ourControls}>

                <div className={styles.ourCtrlBtn} onClick={playVideo}>Play</div>
                <div className={styles.ourCtrlBtn} onClick={pauseVideo}>Pause</div>
                <div className={styles.ourCtrlBtn} onClick={muteToggle}>Mute</div>
                <input type="range" defaultValue={0} min="0" max={videoRef.current?.duration || 0} step="1" />
                <div className={styles.ourCtrlBtn} onClick={fastForward}>Fast Forward</div>
                <div className={styles.ourCtrlBtn} onClick={rewind}>Rewind</div>
                <div className={styles.ourCtrlBtn} onClick={fullScreen}>Full Screen</div>


                <input type="range" min="0" max="1" step="0.01" onChange={changeVolume} />
            </div>
        </div>
    )
};
export default OurVideoPlayer