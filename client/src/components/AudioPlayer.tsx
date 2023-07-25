import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import clsx from "clsx";
import { WaveForm, WaveSurfer } from "wavesurfer-react";

import "../styles/components/audio-player.scss";

interface AudioPlayerProps {
   src: string;
   title?: string;
   subtitle?: string;
   volume?: number;
   className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = (props) => {
   const { title, subtitle, src, volume = 100, className } = props;
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const audioRef = useRef<WaveSurfer | null>(null);

   useEffect(() => {
      if (audioRef.current !== null) audioRef.current.setVolume(volume / 100);
   }, [volume]);

   useEffect(() => {
      if (audioRef.current !== null) {
         audioRef.current.load(src);
      }
      setIsPlaying(false);
   }, [src]);

   function handleSurferMount(surfer: WaveSurfer | null) {
      surfer?.load(src);
      audioRef.current = surfer;
      surfer?.on("finish", () => {
         surfer.play();
      });
   }

   function handlePlayClick() {
      if (!audioRef.current) return;
      audioRef.current.playPause();
      setIsPlaying((prev) => !prev);
   }

   return (
      <div className={clsx("audio_player", className)}>
         {title && (
            <span className="audio_title">
               {title}
               {subtitle && <span className="audio_subtitle"> {subtitle}</span>}
            </span>
         )}
         <div className="audio_wave_player">
            <WaveSurfer onMount={handleSurferMount}>
               <WaveForm
                  id="waveform"
                  cursorColor="#1B6D73"
                  cursorWidth={2}
                  barGap={2.2}
                  barWidth={1}
                  height={50}
                  waveColor={"#6eb9cf"}
                  progressColor={"#415d65"}
                  normalize
                  responsive
               />
            </WaveSurfer>
            <IconButton
               onClick={handlePlayClick}
               className="play_pause_icon_btn"
            >
               {!isPlaying ? <PlayArrowRoundedIcon fontSize="large" /> : <PauseRoundedIcon fontSize="large" />}
            </IconButton>
         </div>
      </div>
   );
};

export default AudioPlayer;
