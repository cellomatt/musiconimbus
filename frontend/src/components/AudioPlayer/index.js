import AudioPlayer, { RHAP_UI }  from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./AudioPlayer.css"

export default function MyAudioPlayer({ nowPlaying }) {

  // const playNext = (nowPlaying) => {
    // FOR FUTURE AUTO-PLAY FEATURE
  // }


  return (
    <div className="player__container">
      {nowPlaying.Album &&
        <div className="song-info__container">
          <p className="song-info">{nowPlaying.title}</p>
          <p className="song-info">{nowPlaying.Album.User.artistName} • <i>{nowPlaying.Album.title}</i></p>
        </div>}
      <AudioPlayer className="player"
        src={nowPlaying.songUrl}
        defaultCurrentTime="0:00" defaultDuration="0:00"
        layout="horizontal-reverse"
        customAdditionalControls={[]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        customProgressBarSection={
          [
            RHAP_UI.CURRENT_TIME,
            <div>/</div>,
            RHAP_UI.DURATION,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.VOLUME,
          ]
        }
        customVolumeControls={[]}
        // showSkipControls={true}
        showJumpControls={false}
        autoPlay
        controls
        controlsList="nodownload"
        // onEnded={playNext}
        // onClickNext={playNext}
        // onClickPrevious={playPrevious}
      />
    </div>
  )
}
