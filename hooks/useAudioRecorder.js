import {useEffect, useState} from 'react';
import {Audio} from 'expo-av';

export default function useAudioRecorder({onComplete} = {}) {
  const [recording, setRecording] = useState();
  const [lastRecording, setLastRecording] = useState();

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false
      });
      const result = recording.getURI();

      setLastRecording(recording);
      onComplete && onComplete(result);
    }
    setRecording(undefined);
  }

  const startRecording = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
  };

  return {
    lastRecording,
    recording,
    toggleRecording: () => recording ? stopRecording() : startRecording(),
    playback: async () => {
      if (!lastRecording) return;

      const { sound } = await lastRecording.createNewLoadedSoundAsync({
        shouldPlay: true,
      });

      await sound.playAsync();
    }
  };
}
