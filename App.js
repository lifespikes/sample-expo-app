import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Button from './components/Button';
import SendAudioModal from './components/SendAudioModal';
import {useState} from 'react';
import {centeredContainer, horizontalStack} from './helpers/styles';

export default function App() {
  const [modalVisible, setModalVisible] = useState('');

  const sendAudio = () => {
    setModalVisible('audio');
  };

  const sendPicture = () => {

  };

  return (
    <View style={centeredContainer}>
      <SendAudioModal visible={modalVisible === 'audio'} onBack={() => setModalVisible('')} />

      <Text style={{fontSize: 36}}>Telegraph</Text>
      <Text style={{fontSize: 18}}>Fast and Easy</Text>

      <View style={{marginTop: 12, ...horizontalStack}}>
        <Button onPress={sendAudio}>Send Audio</Button>
        <Button onPress={sendPicture}>Send Picture</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


