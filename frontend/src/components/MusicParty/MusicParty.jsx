import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import styles from './MusicParty.module.css'; // Import your CSS file for styling

const MusicParty = () => {
  const [audioSrc, setAudioSrc] = useState(''); // State to store the audio source URL

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioSrc(audioUrl);
    }
  };

  return (
    <div className={styles.musicpartycontainer}>
      <h1 className={styles.musicpartytitle} style={{color:"white"}}>Music Party</h1>

      {/* Input for selecting MP3 file */}
      <input
        type="file"
        accept="audio/mp3"
        onChange={handleFileChange}
        className={styles.musicpartyinput}
      />

      
      {audioSrc && (
        <ReactAudioPlayer
          src={audioSrc}
          autoPlay
          controls
          className={styles.musicpartyaudioplayer}
        />
      )}
    </div>
  );
};

export default MusicParty;
