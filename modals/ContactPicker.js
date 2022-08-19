import {useEffect, useState} from 'react';
import * as Contacts from 'expo-contacts';
import {Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import useDebounce from '../hooks/useDebounce';
import Contact from '../components/Contact';

export default function ContactPicker({onClose, visible, onSelect} = {}) {
  const [_contacts, _setContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const debounce = useDebounce();

  useEffect(() => {
    (async () => {
      if (!_contacts.length) {
        if ((await Contacts.requestPermissionsAsync()).status !== 'granted') {
          return onClose();
        }

        const payload = (await Contacts.getContactsAsync()).data;
        _setContacts(payload);
        setContacts(payload);
      }
    })();
  }, []);

  const onSearchChange = (search) => {
    setSearch(search);

    debounce(() => {
      setContacts(
        _contacts
          .filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    }, 350);
  };

  return (
    <Modal animationType="slide" visible={visible} style={{height: '100%'}}>
      <ScrollView style={{height: '100%', marginTop: 52, padding: 24}}>
        <View style={styles.header}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 12}}>Send to a contact</Text>
            <Text>Time to share your masterpiece</Text>
          </View>
          <View>
            <Pressable onPress={onClose}>
              <Text style={{fontWeight: 'bold'}}>Cancel</Text>
            </Pressable>
          </View>
        </View>
        <TextInput
          style={{padding: 10, borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 10}}
          placeholder="Search for a contact..."
          placeholderTextColor="#D8D8D8"
          onChangeText={onSearchChange}
          value={search}
        />
        {contacts.map(contact => (
          <Contact key={contact.id} contact={contact} onPress={(ct) => onSelect(ct)} />
        ))}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
