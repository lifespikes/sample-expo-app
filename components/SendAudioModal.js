import {Image, Modal, Pressable, Text, View} from 'react-native';
import MicrophoneIcon from '../assets/microphone.png';
import Button from './Button';
import {centeredContainer, horizontalStack} from '../helpers/styles';
import useAudioRecorder from '../hooks/useAudioRecorder';
import useUpload from '../hooks/useUpload.js';
import SendToContacts from './SendToContacts';
import {useState} from 'react';
import useShare from '../hooks/useShare';

export default function SendAudioModal({onBack, ...rest}) {
  const {lastRecording, recording, playback, toggleRecording} = useAudioRecorder();
  const {uploadFile, uploading} = useUpload();
  const textMessage = useShare();
  const [sendToContacts, setSendToContacts] = useState(false);
  const [lastURI, setLastURI] = useState(null);
  const buttonBg = (!lastRecording || uploading) ? "#BDBDBD" : "#000";

  const playRecording = async () => {
    if (!lastRecording || uploading) return;
    await playback();
  }

  const sendAudio = async () => {
    if (!lastRecording || uploading) return;
    setLastURI((await uploadFile(lastRecording.getURI())).file);
    setSendToContacts(true);
  };

  const sendSMS = async (contact) => {
    if (!lastURI) return;

    if (contact.phoneNumber) {
      await textMessage.send(
        contact.phoneNumber.number,
        `I just made a masterpiece! Check it out: ${lastURI}`
      );
    } else {
      alert('No phone number found for contact');
    }
  };

  return (
    <Modal animationType="slide" {...rest}>
      <>
        <View style={centeredContainer}>
          <SendToContacts visible={sendToContacts} onSelect={sendSMS} onClose={() => setSendToContacts(false)} />
          <Image source={MicrophoneIcon} style={{width: 150, height: 150, tintColor: recording ? '#FA5858' : null}} />

          <Text style={{margin: 10}}>
            {recording ? 'Hit "Stop" to finish recording' : 'Hit "Record" to get started'}
          </Text>

          <View style={horizontalStack}>
            <Button bg="#FA5858" onPress={toggleRecording}>
              {recording ? 'Stop' : 'Record'}
            </Button>
            <Button bg={buttonBg} onPress={playRecording}>Play</Button>
            <Button bg={buttonBg} onPress={sendAudio}>{uploading ? 'Wait' : 'Send'}</Button>
          </View>

          <Pressable style={{marginTop: 12}} onPress={() => !recording && onBack()}>
            <Text style={{fontWeight: 'bold', color: recording ? '#FFF' : '#000'}}>Go back</Text>
          </Pressable>
        </View>
      </>
    </Modal>
  )
}
