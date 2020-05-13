import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts'

export default class App extends Component {
  state = {
    randomContact: null
  }
  _getRandomContactAsync = async () => {
    const {status} = await Contacts.requestPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permission not granted')
      return
    }
    let contacts = await Contacts.getContactsAsync({
      pageSize: 1,
      offset: 0, 
      fields: ['PHONE_NUMBER']
    })
    // console.log(contacts)

    let {total} = contacts
    let n = Math.floor(Math.random() * total)
    // console.log('n:', n)
    let randomContacts = await Contacts.getContactsAsync({})
    // console.log('random', randomContacts)
    let {data} = randomContacts
    let c = data[n]
    // console.log(c.name)

    this.setState({
      randomContact: c
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps: ' + this.state.randomContact.name)
  }
  render() {
    
    return (
      <View style={styles.container}>
        <Button title="Pick a Random Contact" onPress={() => {
          this._getRandomContactAsync()
        }}  
        />
        {this.state.randomContact && (<Text>{this.state.randomContact.name}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
