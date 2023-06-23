import { StatusBar } from 'expo-status-bar';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [fajr, setFajr] = useState('');
  const [dhuhr, setDhuhr] = useState('');
  const [asr, setAsr] = useState('');
  const [maghrib, setMaghrib] = useState('');
  const [isha, setIsha] = useState('');
  const [isPrayersSaved, setIsPrayersSaved] = useState(false);

  const handleSavePrayers = () => {
    // Create the request body
    const prayerData = {
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
    };

    // Make the POST request to your server
    fetch('https://sparkling-jade-cowboy-boots.cyclic.app/savePrayers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prayerData),
    })
      .then((response) => {
        if (response.ok) {
          // Prayer data saved successfully
          console.log('Prayer data saved!');
          // Reset the form
          setFajr('');
          setDhuhr('');
          setAsr('');
          setMaghrib('');
          setIsha('');
          setIsPrayersSaved(true);
        } else {
          console.error('Failed to save prayer data.');
        }
      })
      .catch((error) => {
        console.error('Error occurred while saving prayer data:', error);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.start}>
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </Text>

      <Text style={styles.prayerTitle}>Add In the Prayer Times Below:</Text>

      <View>
      <TextInput
        placeholder="Fajr"
        value={fajr}
        onChangeText={(text) => setFajr(text)}
        style={styles.prayerInput}
      />

      <TextInput
        placeholder="Dhuhr"
        value={dhuhr}
        onChangeText={(text) => setDhuhr(text)}
        style={styles.prayerInput}
      />

      <TextInput
        placeholder="Asr"
        value={asr}
        onChangeText={(text) => setAsr(text)}
        style={styles.prayerInput}
      />

      <TextInput
        placeholder="Maghrib"
        value={maghrib}
        onChangeText={(text) => setMaghrib(text)}
        style={styles.prayerInput}
      />

      <TextInput
        placeholder="Isha"
        value={isha}
        onChangeText={(text) => setIsha(text)}
        style={styles.prayerInput}
      />

    <TouchableOpacity style={styles.button} onPress={handleSavePrayers}>
        <Text style={styles.buttonText}>Save Prayers</Text>
      </TouchableOpacity>

    </View>

    {isPrayersSaved ? (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Prayers Saved!</Text>

          <TouchableOpacity style={styles.button2} onPress={()=>setIsPrayersSaved(false)}>
            <Text style={styles.buttonText2}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007FFF',
    alignItems: 'center', 
    height: '100%'
  },

  start:{
    fontFamily: 'Arabic',
    fontSize: 36,
    justifyContent: 'flex-start',
    textAlign: 'right',
    marginTop: '15%',
    color: 'white' 
  },

  prayerTitle:{
    color: 'white',
    fontSize: 25,
    marginTop: '20%'
  },

  prayerInput:{
    width: 300,
    color: '#007FFF',
    backgroundColor: 'white',
    height: 50,
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
   button: {
    backgroundColor: '#006',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: 300,
    marginLeft: 10,
    marginRight: 0
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button2: {
    backgroundColor: '#002FFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50,
    width: 200, 
    marginRight: 0
  },
  buttonText2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmationContainer: {
    height: 300,
    width: 300,
    backgroundColor: 'green',
    position: 'absolute',
    top: '25%',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10
  },
  confirmationText:{
    color: 'white',
    fontSize: 36,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
 
  },

});
