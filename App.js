import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Button from './components/Button';
import {useState} from 'react';
import AudioRecorder from './modals/AudioRecorder';

export default function App() {
  const [currentModal, setCurrentModal] = useState('');

  return (
    <View style={styles.container}>
      <AudioRecorder visible={currentModal === 'audio'} onBack={() => setCurrentModal('')} />

      <Text style={styles.header}>Telegraph</Text>
      <Text style={styles.subHeader}>Sharing App</Text>

      <View style={styles.buttonRow}>
        <Button onPress={() => setCurrentModal('audio')}>Send Audio</Button>
        <Button onPress={() => setCurrentModal('picture')}>Send Picture</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 36,
  },

  subHeader: {
    fontSize: 18,
  },

  buttonRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

