import {useEffect, useState} from 'react';
import {Audio} from 'expo-av';

export default function useAudio({onComplete}) {
  const [recording, setRecording] = useState();

  useEffect(() => {
    return () => recording && recording.stopAndUnloadAsync();
  }, [recording]);

  return {
    recording,

    startRecording : async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.LOW_QUALITY
      );

      setRecording(recording);
    },

    stopRecording : async () => {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const result = recording.getURI();

        onComplete && onComplete(result);
      }

      setRecording(undefined);
    }
  };
}
