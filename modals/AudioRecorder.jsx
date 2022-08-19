import {Image, Modal, Pressable, Text, View, StyleSheet} from 'react-native';
import MicrophoneIcon from '../assets/microphone.png';
import useAudioRecorder from '../hooks/useAudioRecorder';
import useUpload from '../hooks/useUpload.js';
import ContactPicker from './ContactPicker';
import {useState} from 'react';
import useTextMessages from '../hooks/useShare';
import Button from '../components/Button';

export default function AudioRecorder({onBack, ...rest}) {
  const [contactModal, setContactModal] = useState(false);
  const [uploadedFileUri, setUploadedFileUri] = useState(null);
  const {startRecording, stopRecording, playRecording, recording, isRecording} = useAudioRecorder();
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
            style={{width: 150, height: 150, tintColor: isRecording ? '#FA5858' : null}}
          />

          <Text style={{margin: 10}}>
            {isRecording ? 'Hit "Stop" to finish recording' : 'Hit "Record" to get started'}
          </Text>

          <View style={styles.buttonRow}>
            <Button bg="#FA5858" onPress={() => isRecording ? stopRecording() : startRecording()}>
              {isRecording ? 'Stop' : 'Record'}
            </Button>
            <Button bg={buttonBg} onPress={playRecording}>Play</Button>
            <Button bg={buttonBg} onPress={shareWithContact}>{uploading ? 'Wait' : 'Send'}</Button>
          </View>

          <Pressable style={styles.goBack} onPress={() => !isRecording && onBack()}>
            <Text style={{fontWeight: 'bold', color: isRecording ? '#FFF' : '#000'}}>Go back</Text>
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
    flex: 1,
  },

  goBack: {marginTop: 12},

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
