import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import guestImg from '../assets/guest.jpeg';

export default function Contact({contact, onPress}) {
  const numbers = contact.phoneNumbers;
  const phoneNumber = numbers?.length > 0 ? (numbers.find(p => p.isPrimary) ?? numbers[0]) : null;

  const meta = [
    contact.company,
    phoneNumber?.number
  ].filter(m => m).join(' • ');

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress({...contact, phoneNumber})}>
      <View style={styles.circle}>
        <Image style={styles.circle} source={contact.image ?? guestImg} />
      </View>
      <View style={{flexGrow: 1, paddingLeft: 8}}>
        <Text style={{fontWeight: 'bold'}}>{contact.name}</Text>
        <Text style={{color: 'gray'}}>{meta}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    paddingVertical: 12
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 100,
  }
});
