import ReactAudioPlayer from 'react-audio-player';
import "./AudioPlayer.css"

export default function AudioPlayer({ nowPlaying }) {

  return (
    <div className="player__container">
      <ReactAudioPlayer className="player"
        src={nowPlaying.songUrl}
        autoPlay
        controls
      />
    </div>
  )
}
