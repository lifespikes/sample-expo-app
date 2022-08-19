import {Image, Modal, Pressable, Text, View} from 'react-native';
import MicrophoneIcon from '../assets/microphone.png';
import useAudioRecorder from '../hooks/useAudioRecorder';
import useUpload from '../hooks/useUpload.js';
import ContactPicker from './ContactPicker';
import {useState} from 'react';
import useTextMessages from '../hooks/useShare';
import Button from '../components/Button';

export default function AudioRecorder({onBack, ...rest}) {
  const {startRecording, stopRecording, playRecording, recording} = useAudioRecorder();
  const [contactModal, setContactModal] = useState(false);
  const [uploadedFileUri, setUploadedFileUri] = useState(null);
  const {uploadFile, uploading} = useUpload();
  const textMessage = useTextMessages();
  const buttonBg = (!recording || uploading) ? "#BDBDBD" : "#000";

  const shareWithContact = async () => {
    if (!recording || uploading) return;

    setUploadedFileUri((await uploadFile(recording.getURI())).file);
    setContactModal(true);
  };

  const sendSMS = async (contact) => {
    if (!uploadedFileUri) return;

    if (contact.phoneNumber) {
      return await textMessage.send(
        contact.phoneNumber.number,
        `I just made a masterpiece! Check it out: ${uploadedFileUri}`
      );
    }

    alert('No phone number found for contact');
  };

  return (
    <Modal animationType="slide" {...rest}>
        <View style={styles.container}>
          <ContactPicker
            visible={contactModal}
            onSelect={sendSMS}
            onClose={() => setContactModal(false)}
          />

          <Image
            source={MicrophoneIcon}
            style={{width: 150, height: 150, tintColor: recording ? '#FA5858' : null}}
          />

          <Text style={{margin: 10}}>
            {recording ? 'Hit "Stop" to finish recording' : 'Hit "Record" to get started'}
          </Text>

          <View style={styles.buttonRow}>
            <Button bg="#FA5858" onPress={recording ? stopRecording() : startRecording()}>
              {recording ? 'Stop' : 'Record'}
            </Button>
            <Button bg={buttonBg} onPress={playRecording}>Play</Button>
            <Button bg={buttonBg} onPress={shareWithContact}>{uploading ? 'Wait' : 'Send'}</Button>
          </View>

          <Pressable style={styles.goBack} onPress={() => !recording && onBack()}>
            <Text style={{fontWeight: 'bold', color: recording ? '#FFF' : '#000'}}>Go back</Text>
          </Pressable>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  goBack: {marginTop: 12},

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
