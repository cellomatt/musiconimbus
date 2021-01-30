import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./AudioPlayer.css"

export default function MyAudioPlayer({ nowPlaying }) {

  return (
    <div className="player__container">
      <AudioPlayer className="player"
        src={nowPlaying.songUrl}
        autoPlay
        controls
        controlsList="nodownload"
      />
    </div>
  )
}
