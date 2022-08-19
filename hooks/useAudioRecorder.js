import {useEffect, useState} from 'react';
import {Audio} from 'expo-av';

export default function useAudioRecorder({onComplete} = {}) {
  const [recording, setRecording] = useState();

  return {
    recording,

    startRecording: async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    },

    stopRecording: async () => {
      if (recording) {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false
        });
        const result = recording.getURI();

        onComplete && onComplete(result);
      }

      setRecording(undefined);
    },

    playRecording: async () => {
      if (!recording) return;

      const { sound } = await recording.createNewLoadedSoundAsync({
        shouldPlay: true,
      });

      await sound.playAsync();
    }
  };
}