import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import MicrophoneIcon from '../assets/microphone.png';
import Button from './Button';
import {centeredContainer, horizontalStack} from '../helpers/styles';
import {Audio} from 'expo-av';
import {useState} from 'react';
import useAudio from '../hooks/useAudio';

export default function SendAudioModal({onBack, ...rest}) {
  const {recording, startRecording, stopRecording} = useAudio({
    onComplete: (uri) => {
      console.log(uri);
    }
  });

  const toggleRecording = () => {
    recording ? stopRecording() : startRecording();
  };

  return (
    <Modal animationType="slide" {...rest}>
      <>
        <View style={centeredContainer}>
          <Image source={MicrophoneIcon} style={{width: 150, height: 150, tintColor: recording ? '#FA5858' : null}} />

          <Text style={{margin: 10}}>
            {recording ? 'Hit "Stop" to finish recording' : 'Hit "Record" to get started'}
          </Text>

          <View style={horizontalStack}>
            <Button bg="#FA5858" onPress={toggleRecording}>
              {recording ? 'Stop' : 'Record'}
            </Button>
            <Button bg="#BDBDBD">Play</Button>
            <Button bg="#BDBDBD">Send</Button>
          </View>

          <Pressable style={{marginTop: 12}} onPress={onBack}>
            <Text style={{fontWeight: 'bold'}}>Go back</Text>
          </Pressable>
        </View>
      </>
    </Modal>
  )
}
