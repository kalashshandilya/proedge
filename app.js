import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Load contacts when the component mounts
    loadContacts();
  }, []);

  const loadContacts = () => {
    // Simulating loading contacts from the phone
    const mockContacts = [
      { name: 'Arjun', number: '1234567890' },
      { name: 'Arjun Singh', number: '9876543210' },
      { name: 'kalash shandilya', number: '5555555555' },
      { name: 'Arjun Pandey', number: '9999999999' },
      // Add more contacts as needed
    ];
    setContacts(mockContacts);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleContactPress = contact => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts"
        onChangeText={text => setSearch(text)}
      />

      <FlatList
        data={filterContacts()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContactPress(item)}
          >
            <Text>{item.name}</Text>
            <Text>{item.number}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <Modal
        visible={!!selectedContact}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{selectedContact?.name}</Text>
            <Text>{selectedContact?.number}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contactItem: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default App
