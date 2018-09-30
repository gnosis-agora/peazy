import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Expo, { Constants, Permissions, Notifications } from 'expo';
import PasswordInputText from 'react-native-hide-show-password-input';


export default class App extends Component {
  static navigationOptions = {
    title: 'Peazy',
  };

  state = {
    compatible: false,
    fingerprints: false,
    result: '',
    password: '',
  }
  
  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    // For push notifcations
    if (Platform.OS === 'android') {
      Expo.Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
      });
    }
    this._registerForPushNotifications();
    }
  async _registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('TOKEN: ' + token);
  }
  
  checkDeviceForHardware = async () => {
    let compatible = await Expo.LocalAuthentication.hasHardwareAsync();
    this.setState({compatible})
  }
  
  checkForFingerprints = async () => {
    let fingerprints = await Expo.LocalAuthentication.isEnrolledAsync();
    this.setState({fingerprints})
  }
  
  scanFingerprint = async (navigate) => {
    let result = await Expo.LocalAuthentication.authenticateAsync('Scan your finger.');
    if (result.success === true) {
      Alert.alert("Success!");
      navigate('Links')
    }
    else {
      Alert.alert(
        "Error",
        result.message ? result.message : "Wrong fingerprint",
        [
          {
            text: "Scan", onPress: () => {
              this.showAndroidAlert();
            }
          }
        ]
      )
    }
  }
  
  showAndroidAlert = (navigate) => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor.',
    )
    this.scanFingerprint(navigate);
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text h3 style={{paddingTop: 20, textAlign: "center"}}>You are logging in to:</Text>
        <View style={{justifyContent: 'center',alignItems: 'center', paddingTop: 15}} >
          <Image source={require('../assets/images/chase.png')} style={{width: 120, height: 80}}/>
        </View>
        <Text h3 style={{paddingTop: 15, textAlign: "center"}}>Location:</Text>
        <Text style={styles.text}>Hayward, CA, US</Text>
        <Text h3 style={{paddingTop: 15, textAlign: "center"}}>Time:</Text>
        <Text style={styles.text}>4:41:24 PM GMT-7</Text>
        <Text style={{fontSize: 18,paddingTop: 10,textAlign: 'center',paddingBottom: 40}}>29th September 2018</Text>
        <Button
          large
          icon={{name: 'fingerprint'}} 
          title='AUTHENTICATE'
          backgroundColor="green"
          onPress={() => {this.showAndroidAlert(navigate)}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    textAlign: 'center'
  }
});
