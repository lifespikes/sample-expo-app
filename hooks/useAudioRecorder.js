import {useEffect, useState} from 'react';
import {Audio} from 'expo-av';

export default function useAudioRecorder() {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);

  return {
    recording,
    isRecording,

    startRecording: async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setIsRecording(true);
      setRecording(recording);
    },

    stopRecording: async () => {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false
      });

      setIsRecording(false);
    },

    playRecording: async () => {
      if (!recording) return;

      await (await recording.createNewLoadedSoundAsync({
        shouldPlay: true,
      })).sound.playAsync();
    }
  };
}
